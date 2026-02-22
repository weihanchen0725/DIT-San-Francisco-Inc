import React from "react";
import IconProps from "../../types/IconProps";

const RouteOptimizationIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

export default RouteOptimizationIcon;
