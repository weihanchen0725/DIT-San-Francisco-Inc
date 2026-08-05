'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import themeSwitcherClass from './ThemeSwitcher.module.scss';
import { useTranslations } from 'next-intl';

interface ThemeSwitcherProps {
  styleMode?: 'row' | 'column';
}

const ThemeSwitcher = ({ styleMode = 'row' }: ThemeSwitcherProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const themeTranslate = useTranslations('Theme');
  // Prevent hydration mismatch
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Don't render theme-dependent UI until mounted
  if (!mounted) {
    return (
      <div className={themeSwitcherClass.themeSwitcherSkeleton}>
        <div className={themeSwitcherClass.themeSwitcherKnob} />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <React.Fragment>
      {styleMode === 'row' ? (
        <button
          onClick={toggleTheme}
          className={`${themeSwitcherClass.themeSwitcher} ${
            isDark ? themeSwitcherClass.themeSwitcherDark : ''
          }`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          role="switch"
          aria-checked={isDark}
        >
          {/* Icons on the track */}
          <Sun className={themeSwitcherClass.themeSwitcherTrackIconSun} />
          <Moon className={themeSwitcherClass.themeSwitcherTrackIconMoon} />

          {/* Toggle knob */}
          <div
            className={`${themeSwitcherClass.themeSwitcherKnob} ${
              isDark ? themeSwitcherClass.themeSwitcherKnobDark : ''
            }`}
          >
            {isDark ? (
              <Moon className={themeSwitcherClass.themeSwitcherKnobIconDark} />
            ) : (
              <Sun className={themeSwitcherClass.themeSwitcherKnobIconLight} />
            )}
          </div>
        </button>
      ) : (
        <div className={themeSwitcherClass.themeSwitcherColumnMode}>
          <span>{themeTranslate('caption')}</span>
          <button
            onClick={toggleTheme}
            className={`${themeSwitcherClass.themeSwitcher} ${
              isDark ? themeSwitcherClass.themeSwitcherDark : ''
            }`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            role="switch"
            aria-checked={isDark}
          >
            {/* Icons on the track */}
            <Sun className={themeSwitcherClass.themeSwitcherTrackIconSun} />
            <Moon className={themeSwitcherClass.themeSwitcherTrackIconMoon} />

            {/* Toggle knob */}
            <div
              className={`${themeSwitcherClass.themeSwitcherKnob} ${
                isDark ? themeSwitcherClass.themeSwitcherKnobDark : ''
              }`}
            >
              {isDark ? (
                <Moon className={themeSwitcherClass.themeSwitcherKnobIconDark} />
              ) : (
                <Sun className={themeSwitcherClass.themeSwitcherKnobIconLight} />
              )}
            </div>
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default ThemeSwitcher;
