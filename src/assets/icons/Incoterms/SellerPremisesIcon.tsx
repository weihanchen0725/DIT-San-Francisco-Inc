import React, { forwardRef } from 'react';

// Extend the standard SVG props to explicitly include our custom overrides
interface SellerPremisesIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  customStrokeWidth?: number | string; 
}

const SellerPremisesIcon = forwardRef<SVGSVGElement, SellerPremisesIconProps>(
  ({ size = 128, customStrokeWidth = 4, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      fill="none"
      {...props}
    >
      <line
        x1="16"
        y1="104"
        x2="112"
        y2="104"
        stroke="#0A192F"
        strokeWidth={customStrokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M 16 104 V 48 L 36 32 L 56 48 V 104"
        stroke="#0A192F"
        strokeWidth={customStrokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 28 104 V 72 H 44 V 104"
        stroke="#0A192F"
        strokeWidth={customStrokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="68"
        y="84"
        width="28"
        height="20"
        rx="2"
        fill="#FFCC00"
        stroke="#0A192F"
        strokeWidth={customStrokeWidth}
        strokeLinejoin="round"
      />
      {/* Kept these at half the main stroke width so the inner details don't turn into a blob! */}
      <line x1="76" y1="84" x2="76" y2="104" stroke="#0A192F" strokeWidth={Number(customStrokeWidth) / 2} />
      <line x1="88" y1="84" x2="88" y2="104" stroke="#0A192F" strokeWidth={Number(customStrokeWidth) / 2} />
    </svg>
  )
);

SellerPremisesIcon.displayName = 'SellerPremisesIcon';

export default SellerPremisesIcon;