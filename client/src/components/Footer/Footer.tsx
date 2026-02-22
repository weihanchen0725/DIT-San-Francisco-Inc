import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Footer = () => {
  // Translations
  const translateCommon = useTranslations("Common");

  return (
    <footer className="bg-brand-navy dark:bg-[#0a0a1a] border-t border-brand-navy-light dark:border-brand-navy-light py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300 dark:text-brand-gray">
            &copy; {new Date().getFullYear()} DIT San Francisco Inc. {translateCommon("all_rights_reserved")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-300 dark:text-brand-gray hover:text-brand-yellow transition-colors"
            >
              {translateCommon("privacy")}
            </a>
            <span className="text-brand-navy-light dark:text-gray-600">|</span>
            <a
              href="#"
              className="text-sm text-gray-300 dark:text-brand-gray hover:text-brand-yellow transition-colors"
            >
              {translateCommon("terms")}
            </a>
            <span className="text-brand-navy-light dark:text-gray-600">|</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
