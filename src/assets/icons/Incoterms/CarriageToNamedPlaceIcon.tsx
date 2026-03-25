import React, { forwardRef } from 'react';

const CarriageToNamedPlaceIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <line x1="16" y1="104" x2="112" y2="104" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" />
      <path d="M 40 104 V 56 H 16" stroke="#98A2B3" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 88 88 H 112 V 64 L 104 52 H 88 V 88 Z" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 32 88 H 84 V 68 H 32 Z" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="44" cy="96" r="6" fill="#0A192F" />
      <circle cx="72" cy="96" r="6" fill="#0A192F" />
      <circle cx="100" cy="96" r="6" fill="#0A192F" />
      <rect x="44" y="48" width="32" height="20" rx="2" fill="#FFCC00" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <line x1="54" y1="48" x2="54" y2="68" stroke="#0A192F" strokeWidth="2" />
      <line x1="66" y1="48" x2="66" y2="68" stroke="#0A192F" strokeWidth="2" />
    </svg>
  )
);

CarriageToNamedPlaceIcon.displayName = 'CarriageToNamedPlaceIcon';

export default CarriageToNamedPlaceIcon;