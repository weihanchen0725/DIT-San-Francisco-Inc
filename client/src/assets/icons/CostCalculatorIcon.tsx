import React from "react";
import IconProps from "../../types/IconProps";

const CostCalculatorIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {/* Calculator body */}
    <rect
      x="4"
      y="2"
      width="16"
      height="20"
      rx="2"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Display screen */}
    <rect
      x="7"
      y="5"
      width="10"
      height="4"
      rx="1"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Dollar sign */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6v2m0 0c-1 0-1.5.5-1.5 1s.5 1 1.5 1 1.5.5 1.5 1-.5 1-1.5 1m0-4c1 0 1.5.5 1.5 1m-1.5 3v1"
    />
    {/* Calculator buttons */}
    <circle cx="8" cy="13" r="0.75" fill="currentColor" />
    <circle cx="12" cy="13" r="0.75" fill="currentColor" />
    <circle cx="16" cy="13" r="0.75" fill="currentColor" />
    <circle cx="8" cy="16" r="0.75" fill="currentColor" />
    <circle cx="12" cy="16" r="0.75" fill="currentColor" />
    <circle cx="16" cy="16" r="0.75" fill="currentColor" />
    <circle cx="8" cy="19" r="0.75" fill="currentColor" />
    <circle cx="12" cy="19" r="0.75" fill="currentColor" />
    <circle cx="16" cy="19" r="0.75" fill="currentColor" />
  </svg>
);

export default CostCalculatorIcon;
