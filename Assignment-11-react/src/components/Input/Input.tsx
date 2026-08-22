import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const inputVariants = cva(
  "w-full rounded-md border focus:outline-none shadow-sm transition-all duration-150 bg-white placeholder:text-gray-400",
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
      tone: {
        default:
          "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
        error:
          "border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-400",
        success:
          "border-green-400 focus:ring-2 focus:ring-green-400 focus:border-green-400",
      },
      disabled: {
        true: "bg-gray-100 text-gray-400 cursor-not-allowed opacity-80",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
      disabled: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "disabled">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      className,
      size = "md",
      tone,
      disabled,
      id,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const inputId =
      id ||
      React.useId?.() ||
      `input-${Math.random().toString(36).slice(2, 9)}`;

    const leftPadding = leftIcon
      ? size === "sm"
        ? "pl-8"
        : size === "lg"
        ? "pl-12"
        : "pl-10"
      : "";

    const rightPadding = rightIcon
      ? size === "sm"
        ? "pr-8"
        : size === "lg"
        ? "pr-12"
        : "pr-10"
      : "";

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative w-full flex items-center">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 pointer-events-none [&>svg]:w-4 [&>svg]:h-4 [&>svg]:md:w-5 [&>svg]:md:h-5">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              inputVariants({ size, tone, disabled }),
              leftPadding,
              rightPadding,
              className
            )}
            disabled={disabled ? true : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:md:w-5 [&>svg]:md:h-5">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : hint ? (
          <p className="text-sm text-gray-500">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input, inputVariants };
