import type { ReactNode } from 'react';

interface SectionHeadingProps {
  level?: 1 | 2 | 3;
  className?: string;
  children: ReactNode;
}

/**
 * Renders an h1, h2, or h3 for section titles.
 * Keeps the `headingLevel` prop pattern DRY - all page-section
 * components accept `headingLevel?: 1 | 2` and delegate here.
 */
const SectionHeading = ({ level = 2, className, children }: SectionHeadingProps) => {
  const Tag = `h${level}` as const;
  return <Tag className={className}>{children}</Tag>;
};

export default SectionHeading;
