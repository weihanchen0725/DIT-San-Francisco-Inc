"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Don't render theme-dependent UI until mounted
  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full p-1 bg-gray-200">
        <div className="w-6 h-6 rounded-full bg-white shadow-md" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 ${
        isDark ? "bg-brand-navy-light" : "bg-gray-200"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Icons on the track */}
      <Sun className="absolute left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-yellow" />
      <Moon className="absolute right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      
      {/* Toggle knob */}
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-brand-navy" />
        ) : (
          <Sun className="w-4 h-4 text-brand-yellow" />
        )}
      </div>
    </button>
  );
};

export default ThemeSwitcher;