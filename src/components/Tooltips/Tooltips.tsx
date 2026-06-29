'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useId,
  ReactNode,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltips.module.scss';

// --- 1. TYPES & CONTEXT ---
type Placement = 'top' | 'bottom' | 'left' | 'right';
type TooltipTriggerChildProps = React.HTMLAttributes<HTMLElement> & {
  ref?: React.Ref<HTMLElement>;
  'aria-expanded'?: boolean;
  'aria-describedby'?: string;
};

interface TooltipContextType {
  isOpen: boolean;
  tooltipId: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  placement: Placement;
  openTooltip: () => void;
  closeTooltip: () => void;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('Tooltip components must be used within <Tooltip />');
  return context;
};

// --- 2. ROOT COMPONENT ---
export interface TooltipProps {
  children: ReactNode;
  placement?: Placement;
  delay?: number | { show: number; hide: number };
}

export const Tooltip = ({ children, placement = 'top', delay = { show: 200, hide: 100 } }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId(); // Generates a unique ID for a11y linking

  const showDelay = typeof delay === 'number' ? delay : delay.show;
  const hideDelay = typeof delay === 'number' ? delay : delay.hide;

  // Handles hover intent to prevent flashing
  const openTooltip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), showDelay);
  }, [showDelay]);

  const closeTooltip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), hideDelay);
  }, [hideDelay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TooltipContext.Provider value={{ isOpen, tooltipId, triggerRef, placement, openTooltip, closeTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

// --- 3. TRIGGER COMPONENT ---
export interface TooltipTriggerProps {
  children: React.ReactElement<TooltipTriggerChildProps>;
}

export const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
  const { openTooltip, closeTooltip, triggerRef, isOpen, tooltipId } = useTooltipContext();

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeTooltip();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeTooltip]);

  const childElement = children;

  return React.cloneElement(childElement, {
    ref: triggerRef,
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      openTooltip();
      childElement.props.onMouseEnter?.(event);
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      closeTooltip();
      childElement.props.onMouseLeave?.(event);
    },
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      openTooltip();
      childElement.props.onFocus?.(event);
    },
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      closeTooltip();
      childElement.props.onBlur?.(event);
    },
    'aria-expanded': isOpen,
    'aria-describedby': isOpen ? tooltipId : undefined, // Links the trigger to the tooltip
  });
};

// --- 4. CONTENT COMPONENT ---
export interface TooltipContentProps extends React.HTMLProps<HTMLDivElement> {
  offset?: number;
  viewportPadding?: number; // How close it can get to the screen edge
}

export const TooltipContent = ({ className = '', offset = 8, viewportPadding = 8, ...props }: TooltipContentProps) => {
  const { isOpen, triggerRef, placement, tooltipId, openTooltip, closeTooltip } = useTooltipContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ left: 0, top: 0 });

  const hasContent = 
    props.children !== undefined && 
    props.children !== null && 
    props.children !== '' &&
    !(typeof props.children === 'string' && props.children.trim() === '');

  useLayoutEffect(() => {
    if (!isOpen || !hasContent || !triggerRef.current || !contentRef.current) return;

    const updatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const contentRect = contentRef.current!.getBoundingClientRect();
      
      let top = 0;
      let left = 0;

      // 1. Calculate Initial Requested Position
      switch (placement) {
        case 'top':
          top = triggerRect.top - contentRect.height - offset;
          left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);
          break;
        case 'bottom':
          top = triggerRect.bottom + offset;
          left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2);
          left = triggerRect.left - contentRect.width - offset;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2);
          left = triggerRect.right + offset;
          break;
      }

      // 2. Flip Logic (if it hits an edge, flip it to the opposite side)
      if (placement === 'top' && top < viewportPadding) top = triggerRect.bottom + offset;
      if (placement === 'bottom' && top + contentRect.height > window.innerHeight - viewportPadding) top = triggerRect.top - contentRect.height - offset;
      if (placement === 'left' && left < viewportPadding) left = triggerRect.right + offset;
      if (placement === 'right' && left + contentRect.width > window.innerWidth - viewportPadding) left = triggerRect.left - contentRect.width - offset;

      // 3. Clamping / Shifting Logic (Ensure it NEVER goes off screen on the cross-axis)
      // If it's too far left
      if (left < viewportPadding) {
        left = viewportPadding;
      } 
      // If it's too far right
      else if (left + contentRect.width > window.innerWidth - viewportPadding) {
        left = window.innerWidth - contentRect.width - viewportPadding;
      }

      // If it's too high
      if (top < viewportPadding) {
        top = viewportPadding;
      }
      // If it's too low
      else if (top + contentRect.height > window.innerHeight - viewportPadding) {
        top = window.innerHeight - contentRect.height - viewportPadding;
      }

      setCoords({
        left: left + window.scrollX,
        top: top + window.scrollY,
      });
    };

    updatePosition();
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    // 4. Handle dynamic content resizing (e.g., an image loading inside the tooltip)
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(triggerRef.current);
    resizeObserver.observe(contentRef.current);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      resizeObserver.disconnect();
    };
  }, [isOpen, placement, offset, viewportPadding, hasContent, triggerRef]);

  if (!isOpen || !hasContent) return null;

  return createPortal(
    <div
      id={tooltipId} // For a11y
      ref={contentRef}
      role="tooltip"
      className={`${styles.tooltipContent} ${className}`}
      style={{
        left: `${coords.left}px`,
        top: `${coords.top}px`,
        ...props.style,
      }}
      onMouseEnter={openTooltip} // Keep open if they hover the tooltip itself
      onMouseLeave={closeTooltip}
      {...props}
    >
      {props.children}
    </div>,
    document.body
  );
};
