import React, { forwardRef } from 'react';

const DeliveredNamedPlaceIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <line x1="16" y1="104" x2="112" y2="104" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" />
      <path d="M 112 104 V 40" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" />
      <path d="M 112 40 L 96 48 L 112 56" fill="#98A2B3" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 72 88 H 96 V 64 L 88 52 H 72 V 88 Z" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 16 88 H 68 V 68 H 16 Z" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="28" cy="96" r="6" fill="#0A192F" />
      <circle cx="56" cy="96" r="6" fill="#0A192F" />
      <circle cx="84" cy="96" r="6" fill="#0A192F" />
      <rect x="28" y="48" width="32" height="20" rx="2" fill="#FFCC00" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <line x1="38" y1="48" x2="38" y2="68" stroke="#0A192F" strokeWidth="2" />
      <line x1="50" y1="48" x2="50" y2="68" stroke="#0A192F" strokeWidth="2" />
    </svg>
  )
);

DeliveredNamedPlaceIcon.displayName = 'DeliveredNamedPlaceIcon';

export default DeliveredNamedPlaceIcon;