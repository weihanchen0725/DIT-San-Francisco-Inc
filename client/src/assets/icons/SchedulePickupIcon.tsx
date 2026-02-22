import React from "react";
import IconProps from "../../types/IconProps";

const SchedulePickupIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {/* Calendar base */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
    {/* Clock/time indicator */}
    <circle
      cx="17"
      cy="17"
      r="4"
      strokeWidth={2}
      fill="white"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 15v2l1.5 1"
    />
  </svg>
);

export default SchedulePickupIcon;
