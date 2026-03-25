import React, { forwardRef } from 'react';

const BuyerPremisesIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <line x1="16" y1="104" x2="112" y2="104" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" />
      <path d="M 112 104 V 48 L 88 32 L 64 48 V 104" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M 96 104 V 72 H 80 V 104" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <rect x="20" y="84" width="32" height="20" rx="2" fill="#FFCC00" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <line x1="30" y1="84" x2="30" y2="104" stroke="#0A192F" strokeWidth="2" />
      <line x1="42" y1="84" x2="42" y2="104" stroke="#0A192F" strokeWidth="2" />
    </svg>
  )
);

BuyerPremisesIcon.displayName = 'BuyerPremisesIcon';

export default BuyerPremisesIcon;