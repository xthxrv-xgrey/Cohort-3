import React, { useState, useEffect } from "react";
import { cn } from "@/libs/utils";
import { cva } from "class-variance-authority";

const wrapper = cva("relative w-full");
const inputCls = cva(
  "w-full bg-transparent border-b border-gray-500 pb-2 pt-6 focus:outline-none transition-all",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface FloatingLabelProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  size?: "sm" | "md" | "lg";
}

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelProps
>(({ label, size = "md", className, onChange, ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(props.value ?? props.defaultValue ?? "");

  useEffect(() => {
    if (props.value !== undefined) {
      setLocalValue(props.value);
    }
  }, [props.value]);

  const shrink = focused || !!localValue;
  return (
    <div className={wrapper()}>
      <input
        ref={ref}
        {...props}
        onChange={(e) => {
          setLocalValue(e.target.value);
          onChange?.(e);
        }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(inputCls({ size }), className)}
      />
      <label
        className={cn(
          "absolute left-0 top-2 origin-left text-gray-500 pointer-events-none transform transition-all",
          shrink ? "-translate-y-4 scale-75" : "translate-y-0 scale-100"
        )}
      >
        {label}
      </label>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";
