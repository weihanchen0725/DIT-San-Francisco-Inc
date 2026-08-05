import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve('src');
const cssModulePattern = /\.module\.(?:css|scss)$/;
const scriptPattern = /\.[cm]?[jt]sx?$/;
const lowerCamelCasePattern = /^[a-z][A-Za-z0-9]*$/;

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });

const toRelative = (filePath) => path.relative(process.cwd(), filePath);
const lineForIndex = (source, index) => source.slice(0, index).split('\n').length;
const failures = [];

const report = (filePath, source, index, className, context) => {
  failures.push(
    `${toRelative(filePath)}:${lineForIndex(source, index)} ${context} "${className}" must use lower camelCase`
  );
};

for (const filePath of walk(sourceRoot)) {
  const source = fs.readFileSync(filePath, 'utf8');

  if (cssModulePattern.test(filePath)) {
    const localSource = source.replace(/:global\([^)]*\)/g, '');

    for (const match of localSource.matchAll(/\.([A-Za-z][A-Za-z0-9_-]*)/g)) {
      const className = match[1];
      if (!lowerCamelCasePattern.test(className)) {
        report(filePath, localSource, match.index, className, 'CSS Module class');
      }
    }

    for (const match of localSource.matchAll(/&([_-][A-Za-z0-9][A-Za-z0-9_-]*)/g)) {
      report(filePath, localSource, match.index, match[1], 'Nested CSS Module suffix');
    }

    if (!filePath.endsWith(`${path.sep}Map.module.scss`)) {
      for (const match of localSource.matchAll(/border-radius:\s*([^;]+);/g)) {
        const value = match[1].trim();
        const isToken = value.startsWith('var(--radius-');
        const isSquare = /^(?:0|0px|0rem)$/.test(value);
        const isCircularShape = /^(?:50%|0)(?:\s+(?:50%|0))*$/.test(value);

        if (!isToken && !isSquare && !isCircularShape) {
          failures.push(
            `${toRelative(filePath)}:${lineForIndex(localSource, match.index)} border-radius "${value}" must use a --radius-* token`
          );
        }
      }
    }

    continue;
  }

  if (!scriptPattern.test(filePath)) continue;

  const aliases = [
    ...source.matchAll(
      /import\s+([A-Za-z_$][\w$]*)\s+from\s+['"][^'"]+\.module\.(?:css|scss)['"]/g
    ),
  ].map((match) => match[1]);

  for (const alias of aliases) {
    const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    for (const match of source.matchAll(
      new RegExp(`\\b${escapedAlias}(?:\\?\\.|\\.)([A-Za-z][A-Za-z0-9_-]*)`, 'g')
    )) {
      const className = match[1];
      if (!lowerCamelCasePattern.test(className)) {
        report(filePath, source, match.index, className, 'CSS Module property');
      }
    }

    for (const access of source.matchAll(
      new RegExp(`\\b${escapedAlias}(?:\\?\\.)?\\[([^\\]]+)\\]`, 'g')
    )) {
      for (const match of access[1].matchAll(/(['"])([A-Za-z][A-Za-z0-9_-]*)\1/g)) {
        const className = match[2];
        if (!lowerCamelCasePattern.test(className)) {
          report(filePath, source, access.index, className, 'CSS Module key');
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error(
    ['Style convention check failed:', ...failures.map((failure) => `- ${failure}`)].join('\n')
  );
  process.exit(1);
}

console.log('Style convention check passed.');
