import React, { forwardRef } from 'react';

const PortofDestinationIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <line x1="16" y1="104" x2="56" y2="104" stroke="#98A2B3" strokeWidth="4" strokeLinecap="round" />
      <line x1="64" y1="104" x2="112" y2="104" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" />
      <path d="M 56 88 L 48 104 H 16 V 88 Z" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 88 104 V 24 H 36" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 88 64 L 64 24" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="50" y1="24" x2="50" y2="56" stroke="#0A192F" strokeWidth="4" />
      <rect x="36" y="56" width="28" height="20" rx="2" fill="#FFCC00" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <line x1="44" y1="56" x2="44" y2="76" stroke="#0A192F" strokeWidth="2" />
      <line x1="56" y1="56" x2="56" y2="76" stroke="#0A192F" strokeWidth="2" />
    </svg>
  )
);

PortofDestinationIcon.displayName = 'PortofDestinationIcon';

export default PortofDestinationIcon;