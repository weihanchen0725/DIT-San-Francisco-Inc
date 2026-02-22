"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
// import Image from "next/image";
// import CompanyLogo from '../../assets/icons/DITLogo.svg'
import NavBarData from './NavBarData.json'
import { useTranslations } from "next-intl";
import Image from "next/image";

const NavBar = () => {
  // Translations
  const translateNavBar = useTranslations("NavBar");

  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Ref for the nav element to detect outside clicks
  const navRef = useRef<HTMLElement>(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Classes for navigation links
  const defaultDesktopLinkClasses = useMemo(() => {
    return "px-4 py-2 rounded-md text-brand-navy dark:text-gray-100 font-medium hover:bg-brand-yellow-light dark:hover:bg-brand-yellow/20 hover:text-brand-navy dark:hover:text-brand-yellow transition-all duration-200 whitespace-nowrap";
  }, []);
  const redDesktopLinkClasses = useMemo(() => {
    return "ml-2 px-5 py-2 rounded-md bg-brand-yellow text-brand-navy font-semibold hover:bg-brand-yellow-hover shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap";
  }, []);
  // Classes for disabled navigation link
  const disabledDesktopLinkClasses = useMemo(() => {
    return "px-4 py-2 rounded-md text-brand-gray dark:text-gray-600 font-medium cursor-not-allowed transition-all duration-200 whitespace-nowrap";
  }, []);

  // Function to get classes for desktop navigation links based on color
  const getDesktopLinkClasses = (item: { color: string }) => {
    switch (item.color) {
      case "red":
        return redDesktopLinkClasses;
      case "disabled":
        return disabledDesktopLinkClasses;
      default:
        return defaultDesktopLinkClasses;
    }
  };

  // Function to get classes for mobile navigation links based on color
  const defaultMobileLinkClasses = useMemo(() => {
    return "block px-4 py-3 rounded-md text-brand-navy dark:text-gray-100 font-medium hover:bg-brand-yellow-light dark:hover:bg-brand-yellow/20 hover:text-brand-navy dark:hover:text-brand-yellow transition-all duration-200";
  }, []);
  // Mobile navigation link classes
  const redMobileLinkClasses = useMemo(() => {
    return "block px-4 py-3 rounded-md bg-brand-yellow text-brand-navy font-semibold text-center hover:bg-brand-yellow-hover shadow-md hover:shadow-lg transition-all duration-200 mt-2";
  }, []);
  const disabledMobileLinkClasses = useMemo(() => {
    return "block px-4 py-3 rounded-md text-brand-gray dark:text-gray-600 font-medium cursor-not-allowed transition-all duration-200";
  }, []);

  // Function to get classes for mobile navigation links based on color
  const getMobileLinkClasses = (item: { color: string }) => {
    switch (item.color) {
      case "red":
        return redMobileLinkClasses;
      case "disabled":
        return disabledMobileLinkClasses;
      default:
        return defaultMobileLinkClasses;
    }
  };

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  

  return (
    <nav ref={navRef} className="bg-white dark:bg-[#0a0a1a] shadow-sm dark:shadow-none border-b border-gray-100 dark:border-brand-navy-light relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:max-w-screen-2xl">
        <div className="flex flex-row items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <Image src={CompanyLogo} alt="Company Logo" className="h-10 w-auto" /> */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image 
              src="/DITLogo.svg" 
              alt="DIT San Francisco Inc. Logo" 
              width={45} 
              height={45}
              priority
              style={{ width: 'auto', height: 'auto' }}
              />
              {translateNavBar("title")}
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {NavBarData.data.map((item, index) =>
                item.isActive && (
                  <React.Fragment key={item.name + index}>
                  {index === NavBarData.data.length - 1 && (
                    <ThemeSwitcher />
                  )}
                  <Link
                    href={item.isDisabled ? "#" : item.href}
                    className={item.isDisabled ? getDesktopLinkClasses({ color: "disabled" }) : getDesktopLinkClasses(item)}
                    aria-disabled={item.isDisabled}
                    onClick={item.isDisabled ? (e) => e.preventDefault() : undefined}
                  >
                    {translateNavBar(item.name)}
                  </Link>
                  </React.Fragment>
                  
                )
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-brand-navy dark:text-gray-100 hover:bg-brand-yellow-light dark:hover:bg-brand-yellow/20 focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-[#0a0a1a] shadow-lg dark:shadow-none border-b border-gray-100 dark:border-brand-navy-light transform transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {NavBarData.data.map((item, index) => (
            <React.Fragment key={item.name + index}>
              {index === NavBarData.data.length - 1 && (
                <div key={`theme-switcher-${NavBarData.data.length}`} className="flex items-center justify-between px-4 py-3 rounded-md text-brand-navy dark:text-gray-100 font-medium">
                  <span>{translateNavBar("Appearance")}</span>
                  <ThemeSwitcher />
                </div>
              )}
              <Link
                key={item.name + index}
                href={item.isDisabled ? "#" : item.href}
                onClick={item.isDisabled ? (e) => e.preventDefault() : closeMenu}
                className={item.isDisabled ? getMobileLinkClasses({ color: "disabled" }) : getMobileLinkClasses(item)}
              >
                {translateNavBar(item.name)}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
