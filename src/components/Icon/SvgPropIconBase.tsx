import React, { forwardRef, memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltips/Tooltips';

type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface SvgPropIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  icon: SvgComponent;
  size?: number | string;
  decorative?: boolean;
  tooltip?: string;
}

const SvgPropIconBase = forwardRef<SVGSVGElement, SvgPropIconProps>(
  (
    {
      icon: Icon,
      size = 24,
      className,
      decorative = true,
      'aria-label': ariaLabel,
      tooltip,
      role,
      ...rest
    },
    ref
  ) => {
    const resolvedClassName = ['inline-block', 'shrink-0', className]
      .filter(Boolean)
      .join(' ');

    const accessibilityProps = decorative && !ariaLabel
      ? {
          'aria-hidden': true,
          focusable: false,
        }
      : {
          role: role ?? 'img',
          'aria-label': ariaLabel,
        };

    return (
      <Tooltip placement='top'>
        <TooltipTrigger>
            <Icon
          ref={ref}
          width={size}
          height={size}
          className={resolvedClassName}
          {...accessibilityProps}
          {...rest}
        />
        </TooltipTrigger>
        <TooltipContent>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }
);

SvgPropIconBase.displayName = 'SvgPropIcon';

export const SvgPropIcon = memo(SvgPropIconBase);
SvgPropIcon.displayName = 'SvgPropIcon';