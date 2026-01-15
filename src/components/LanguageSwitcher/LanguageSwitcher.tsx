"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import { Globe } from "lucide-react";

// Supported languages configuration - easy to extend
const SUPPORTED_LANGUAGES = [
    { code: "en", label: "english" },
    { code: "zh-TW", label: "traditional_chinese" },
    // Add more languages here as needed
] as const;

type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

const LanguageSwitcher = () => {
    const translateCommon = useTranslations("Common");
    const locale = useLocale() as LanguageCode;
    const router = useRouter();
    const pathName = usePathname();

    // Handle language change by updating the URL path
    const handleLanguageChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            const selectedLocale = event.target.value;
            const newPath = pathName.replace(`/${locale}`, `/${selectedLocale}`);
            router.replace(newPath);
        },
        [locale, pathName, router]
    );

    return (
        <span className="whitespace-nowrap gap-1 flex items-center flex-row justify-center">
            <Globe className="inline-block w-3.5 h-3.5 align-middle text-gray-400 dark:text-gray-500" />
            <select
                id="language-select"
                value={locale}
                onChange={handleLanguageChange}
                className="inline-block align-middle ml-1 py-0.5 text-xs appearance-none
                           bg-transparent text-gray-500 dark:text-gray-400
                           hover:text-red-600 dark:hover:text-red-500
                           focus:outline-none focus:text-red-600
                           cursor-pointer transition-colors"
                aria-label={translateCommon("select_language")}
            >
                {SUPPORTED_LANGUAGES.map((lang) => (
                    <option 
                        key={lang.code} 
                        value={lang.code}
                        className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
                    >
                        {translateCommon(lang.label)}
                    </option>
                ))}
            </select>
        </span>
    );
};

export default LanguageSwitcher;