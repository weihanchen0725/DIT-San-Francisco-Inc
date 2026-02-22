import React from "react";
import IconProps from "../../types/IconProps";

const TrackingSolutionIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {/* Truck body */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
    />
    {/* GPS/Location pin */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 2.5a2.5 2.5 0 00-2.5 2.5c0 1.38 2.5 4 2.5 4s2.5-2.62 2.5-4A2.5 2.5 0 0012 2.5z"
      fill="currentColor"
      fillOpacity={0.2}
    />
    <circle cx="12" cy="5" r="0.75" fill="currentColor" />
    {/* Signal waves */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M18 4c.5.5 1 1.5 1 2.5s-.5 2-1 2.5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M20 2.5c1 1 1.5 2.5 1.5 4s-.5 3-1.5 4"
    />
  </svg>
);

export default TrackingSolutionIcon;
