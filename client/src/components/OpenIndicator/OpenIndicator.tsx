"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

interface BusinessHours {
  [key: string]: { open: string; close: string } | null;
}

const businessHours: BusinessHours = {
  monday: { open: "07:00", close: "17:30" },
  tuesday: { open: "07:00", close: "17:30" },
  wednesday: { open: "07:00", close: "17:30" },
  thursday: { open: "07:00", close: "17:30" },
  friday: { open: "07:00", close: "17:30" },
  saturday: null, // Closed
  sunday: null, // Closed
};

const dayOrder = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const formatTime = (time24: string): string => {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const getNextOpenDay = (currentDayIndex: number): { day: string; hours: { open: string; close: string } } | null => {
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDayIndex + i) % 7;
    const nextDay = dayOrder[nextDayIndex];
    const hours = businessHours[nextDay];
    if (hours) {
      return { day: nextDay, hours };
    }
  }
  return null;
};

interface OpenStatus {
  isOpen: boolean;
  statusText: string;
  nextChange: string;
}

const getOpenStatus = (): OpenStatus => {
  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentDay = dayOrder[currentDayIndex];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todayHours = businessHours[currentDay];

  if (!todayHours) {
    // Closed today, find next open day
    const nextOpen = getNextOpenDay(currentDayIndex);
    if (nextOpen) {
      return {
        isOpen: false,
        statusText: "Closed",
        nextChange: `Opens ${nextOpen.day.charAt(0).toUpperCase() + nextOpen.day.slice(1)} ${formatTime(nextOpen.hours.open)}`,
      };
    }
    return {
      isOpen: false,
      statusText: "Closed",
      nextChange: "",
    };
  }

  const openMinutes = timeToMinutes(todayHours.open);
  const closeMinutes = timeToMinutes(todayHours.close);

  if (currentMinutes < openMinutes) {
    // Before opening
    return {
      isOpen: false,
      statusText: "Closed",
      nextChange: `Opens ${formatTime(todayHours.open)}`,
    };
  } else if (currentMinutes < closeMinutes) {
    // Currently open
    const closingSoon = closeMinutes - currentMinutes <= 60;
    return {
      isOpen: true,
      statusText: closingSoon ? "Closes soon" : "Open",
      nextChange: `Closes ${formatTime(todayHours.close)}`,
    };
  } else {
    // After closing
    const nextOpen = getNextOpenDay(currentDayIndex);
    if (nextOpen) {
      const isTomorrow = (currentDayIndex + 1) % 7 === dayOrder.indexOf(nextOpen.day);
      return {
        isOpen: false,
        statusText: "Closed",
        nextChange: isTomorrow
          ? `Opens tomorrow ${formatTime(nextOpen.hours.open)}`
          : `Opens ${nextOpen.day.charAt(0).toUpperCase() + nextOpen.day.slice(1)} ${formatTime(nextOpen.hours.open)}`,
      };
    }
    return {
      isOpen: false,
      statusText: "Closed",
      nextChange: "",
    };
  }
};

const OpenIndicator = () => {
  const t = useTranslations("OpenIndicator");
  const [status, setStatus] = useState<OpenStatus>(() => getOpenStatus());
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mark as mounted to enable hydration
    const timeout = setTimeout(() => {
      setMounted(true);
      setStatus(getOpenStatus());
    }, 0);

    // Update status every minute
    const interval = setInterval(() => {
      setStatus(getOpenStatus());
    }, 60000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-pulse" />
        <span className="text-sm font-medium text-gray-500">Loading...</span>
      </div>
    );
  }

  const currentDayIndex = new Date().getDay();

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Main indicator button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#111127] border border-gray-200 dark:border-brand-navy-light hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        aria-expanded={isExpanded}
        aria-haspopup="true"
      >
        {/* Status dot */}
        <span className="relative flex h-2.5 w-2.5">
          {status.isOpen && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              status.isOpen
                ? status.statusText === "Closes soon"
                  ? "bg-yellow-500"
                  : "bg-green-500"
                : "bg-red-500"
            }`}
          />
        </span>

        {/* Status text */}
        <span
          className={`text-sm font-semibold ${
            status.isOpen
              ? status.statusText === "Closes soon"
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {status.isOpen ? t("open") : t("closed")}
        </span>

        {/* Separator and next change info */}
        {status.nextChange && (
          <>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {status.nextChange}
            </span>
          </>
        )}

        {/* Dropdown arrow */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isExpanded && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-[#111127] rounded-xl border border-gray-200 dark:border-brand-navy-light shadow-xl z-50 overflow-hidden">
          <div className="p-4">
            {/* <h4 className="text-sm font-semibold text-brand-navy dark:text-white mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-brand-yellow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {t("business_hours")}
            </h4> */}
            <ul className="space-y-2">
              {dayOrder.map((day, index) => {
                const hours = businessHours[day];
                const isToday = index === currentDayIndex;

                return (
                  <li
                    key={day}
                    className={`flex justify-between items-center py-1.5 px-2 rounded-lg text-sm ${
                      isToday
                        ? "bg-brand-yellow/10 dark:bg-brand-yellow/20"
                        : ""
                    }`}
                  >
                    <span
                      className={`${
                        isToday
                          ? "font-semibold text-brand-navy dark:text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {t(day)}
                      {isToday && (
                        <span className="ml-1.5 text-xs text-brand-yellow">
                          ({t("today")})
                        </span>
                      )}
                    </span>
                    <span
                      className={`${
                        isToday
                          ? "font-semibold text-brand-navy dark:text-white"
                          : hours
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {hours
                        ? `${formatTime(hours.open)} - ${formatTime(hours.close)}`
                        : t("closed")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenIndicator;
