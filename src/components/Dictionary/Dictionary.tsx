import { getTranslations } from 'next-intl/server';
import enDict from '@/assets/international/en/dictionary.json';
import zhTWDict from '@/assets/international/zh-TW/dictionary.json';
import dictionaryKeys from './dictionary.data.json';
import dictionaryClass from './Dictionary.module.scss';
import NavBar from './NavBar/NavBar';

const { keyList } = dictionaryKeys;

const filteredKeys = keyList.filter((key) => /^[a-zA-Z]/.test(key));

const navLetters = [...new Set(filteredKeys.map((key) => key.charAt(0).toUpperCase()))].sort();

/** Group keys by their first letter for semantic HTML structure. */
const groupedByLetter = filteredKeys.reduce<Record<string, string[]>>((acc, key) => {
  const letter = key.charAt(0).toUpperCase();
  (acc[letter] ??= []).push(key);
  return acc;
}, {});

// Build display-name → CSS-slug map from both locales' categories objects.
// When new categories are added to the JSON files this updates automatically.
const CATEGORY_TO_SLUG: Record<string, string> = Object.fromEntries(
  [
    ...Object.entries(enDict.categories),
    ...Object.entries(zhTWDict.categories),
  ].map(([key, display]) => [display, key.replace(/_/g, '-')])
);

const toCategorySlug = (category: string) => CATEGORY_TO_SLUG[category] ?? '';

const Dictionary = async () => {
  const translateDictionary = await getTranslations('dictionary');
  return (
    <>
      <NavBar navLetters={navLetters} />
      <div className={dictionaryClass['dictionary-content']}>
        {navLetters.map((letter) => (
          <section key={letter} className={dictionaryClass['dictionary-section']}>
            <h2 id={letter}>{letter}</h2>
            <ul className={dictionaryClass['dictionary-list']}>
              {groupedByLetter[letter].map((key) => (
                <li key={key} className={dictionaryClass['dictionary-item']}>
                  <h3>{translateDictionary(`${key}.term`)}</h3>
                  <div className={dictionaryClass['dictionary-category-wrapper']}>
                    {(() => {
                      const category = translateDictionary.raw(`${key}.category`) as string;
                      const slug = toCategorySlug(category);
                      return (
                        <span
                          className={[
                            dictionaryClass['dictionary-category'],
                            dictionaryClass[`category-${slug}`],
                          ].join(' ')}
                        >
                          {category}
                        </span>
                      );
                    })()}
                  </div>
                  <p className={dictionaryClass['dictionary-definition']}>
                    {translateDictionary(`${key}.definition`)}
                  </p>
                  <ul className={dictionaryClass['dictionary-related-terms']}>
                    {(translateDictionary.raw(`${key}.relatedTerms`) as string[]).map((term) => (
                      <li key={term}>
                        <i>#{term.trim().replace(' ', '_')}</i>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
};

export default Dictionary;
