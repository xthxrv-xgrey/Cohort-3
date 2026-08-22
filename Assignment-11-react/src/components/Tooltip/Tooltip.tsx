import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const tooltipVariants = cva(
  "absolute z-50 px-3 py-1.5 text-xs font-medium rounded-md shadow-md border whitespace-nowrap pointer-events-none select-none",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-slate-100 border-slate-800",
        light: "bg-white text-gray-800 border-gray-200",
        glass: "backdrop-blur-md bg-white/20 text-white border-white/20 shadow-md",
        primary: "bg-indigo-600 text-white border-indigo-500",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  }
);

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  children: React.ReactElement<any>;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      variant,
      content,
      position = "top",
      delay = 200,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 100); // Small grace period for mouse out
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    useEffect(() => {
      const el = tooltipRef.current;
      if (!el) return;

      if (isVisible) {
        gsap.killTweensOf(el);
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.5)",
            display: "block",
          }
        );
      } else {
        gsap.killTweensOf(el);
        gsap.to(el, {
          opacity: 0,
          scale: 0.9,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            if (el) el.style.display = "none";
          },
        });
      }
    }, [isVisible]);

    // Position CSS helper classes
    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    // Arrow CSS classes
    const arrowClasses = {
      top: "absolute top-full left-1/2 -translate-x-1/2 border-t-4 border-x-4 border-x-transparent border-t-[inherit] -mt-[1px]",
      bottom: "absolute bottom-full left-1/2 -translate-x-1/2 border-b-4 border-x-4 border-x-transparent border-b-[inherit] -mb-[1px]",
      left: "absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-y-4 border-y-transparent border-l-[inherit] -ml-[1px]",
      right: "absolute right-full top-1/2 -translate-y-1/2 border-r-4 border-y-4 border-y-transparent border-r-[inherit] -mr-[1px]",
    };

    // Wire mouse events to children trigger
    const trigger = React.cloneElement(children, {
      onMouseEnter: (e: React.MouseEvent) => {
        showTooltip();
        if (children.props.onMouseEnter) children.props.onMouseEnter(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        hideTooltip();
        if (children.props.onMouseLeave) children.props.onMouseLeave(e);
      },
      onFocus: (e: React.FocusEvent) => {
        showTooltip();
        if (children.props.onFocus) children.props.onFocus(e);
      },
      onBlur: (e: React.FocusEvent) => {
        hideTooltip();
        if (children.props.onBlur) children.props.onBlur(e);
      },
    });

    return (
      <div className="relative inline-block">
        {trigger}
        <div
          ref={(node) => {
            tooltipRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          style={{ display: "none" }}
          className={cn(
            tooltipVariants({ variant }),
            positionClasses[position],
            className
          )}
          {...props}
        >
          {content}
          <div className={arrowClasses[position]} style={{ borderColor: "inherit" }} />
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
