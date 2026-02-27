"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import themeSwitcherClass from "./ThemeSwitcher.module.scss";


interface ThemeSwitcherProps {
  styleMode?: "row" | "column";
}

const ThemeSwitcher = ({ styleMode = "row" }: ThemeSwitcherProps) => {
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
      <div className={themeSwitcherClass.themeSwitcher_skeleton}>
        <div className={themeSwitcherClass.themeSwitcher_knob} />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <React.Fragment>
      {styleMode === 'row' ? (
        <button
      onClick={toggleTheme}
      className={`${themeSwitcherClass.themeSwitcher} ${
        isDark ? themeSwitcherClass.themeSwitcher_dark : ""
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      role="switch"
      aria-checked={isDark}
    >
      {/* Icons on the track */}
      <Sun className={themeSwitcherClass.themeSwitcher_trackIconSun} />
      <Moon className={themeSwitcherClass.themeSwitcher_trackIconMoon} />

      {/* Toggle knob */}
      <div
        className={`${themeSwitcherClass.themeSwitcher_knob} ${
          isDark ? themeSwitcherClass.themeSwitcher_knobDark : ""
        }`}
      >
        {isDark ? (
          <Moon className={themeSwitcherClass.themeSwitcher_knobIconDark} />
        ) : (
          <Sun className={themeSwitcherClass.themeSwitcher_knobIconLight} />
        )}
      </div>
    </button>
      ) : (
        <div className={themeSwitcherClass.themeSwitcher_columnMode}>
          <span>Theme</span>
          <button
            onClick={toggleTheme}
            className={`${themeSwitcherClass.themeSwitcher} ${
              isDark ? themeSwitcherClass.themeSwitcher_dark : ""
            }`}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            role="switch"
            aria-checked={isDark}
          >
            {/* Icons on the track */}
            <Sun className={themeSwitcherClass.themeSwitcher_trackIconSun} />
            <Moon className={themeSwitcherClass.themeSwitcher_trackIconMoon} />

            {/* Toggle knob */}
            <div
              className={`${themeSwitcherClass.themeSwitcher_knob} ${
                isDark ? themeSwitcherClass.themeSwitcher_knobDark : ""
              }`}
            >
              {isDark ? (
                <Moon className={themeSwitcherClass.themeSwitcher_knobIconDark} />
              ) : (
                <Sun className={themeSwitcherClass.themeSwitcher_knobIconLight} />
              )}
            </div>
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default ThemeSwitcher;
