import React, { useRef } from "react";
import { Input, type InputProps } from "./Input";
import { cn } from "@/libs/utils";
import gsap from "gsap";

type Props = Omit<InputProps, "leftIcon" | "rightIcon"> & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconColor?: string;
  animated?: boolean;
};

export const InputWithIcon = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      icon,
      iconPosition = "left",
      className,
      iconColor = "#9ca3af",
      animated = true,
      ...props
    },
    ref
  ) => {
    const iconRef = useRef<HTMLDivElement | null>(null);

    const handleFocus = () => {
      if (!animated || !iconRef.current) return;
      gsap.to(iconRef.current, {
        scale: 1.15,
        color: "#3b82f6",
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleBlur = () => {
      if (!animated || !iconRef.current) return;
      gsap.to(iconRef.current, {
        scale: 1,
        color: iconColor,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const iconElement = icon ? (
      <div
        ref={iconRef}
        className={cn(
          "text-gray-400 transition-all duration-200 pointer-events-none flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 [&>svg]:md:w-5 [&>svg]:md:h-5",
          animated && "will-change-transform will-change-color"
        )}
        style={{ color: iconColor }}
      >
        {icon}
      </div>
    ) : undefined;

    const leftIcon = iconPosition === "left" ? iconElement : undefined;
    const rightIcon = iconPosition === "right" ? iconElement : undefined;

    return (
      <Input
        ref={ref}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onFocus={(e) => {
          handleFocus();
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          handleBlur();
          props.onBlur?.(e);
        }}
        className={cn(
          "rounded-xl border border-gray-300 bg-white shadow-sm hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
