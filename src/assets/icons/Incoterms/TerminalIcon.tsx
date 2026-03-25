import React, { forwardRef } from 'react';

const TerminalIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <line x1="16" y1="104" x2="112" y2="104" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" />
      <path d="M 112 104 V 56 H 80 V 104" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 80 64 L 64 64" stroke="#0A192F" strokeWidth="4" strokeLinecap="round" />
      <line x1="68" y1="64" x2="68" y2="104" stroke="#0A192F" strokeWidth="4" />
      <rect x="28" y="84" width="32" height="20" rx="2" fill="#FFCC00" stroke="#0A192F" strokeWidth="4" strokeLinejoin="round" />
      <line x1="38" y1="84" x2="38" y2="104" stroke="#0A192F" strokeWidth="2" />
      <line x1="50" y1="84" x2="50" y2="104" stroke="#0A192F" strokeWidth="2" />
    </svg>
  )
);

TerminalIcon.displayName = 'TerminalIcon';

export default TerminalIcon;