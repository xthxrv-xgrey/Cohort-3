import React, { useRef } from "react";
import { Input, type InputProps } from "./Input";

type NumberProps = Omit<InputProps, "type" | "onChange"> & {
  onChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberProps>(
  ({ onChange, step = 1, min, max, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInc = () => {
      const el = inputRef.current;
      if (!el) return;
      const cur = Number(el.value || 0);
      const next = cur + step;
      if (max !== undefined && next > max) return;
      el.value = String(next);
      onChange?.(next);
    };

    const handleDec = () => {
      const el = inputRef.current;
      if (!el) return;
      const cur = Number(el.value || 0);
      const next = cur - step;
      if (min !== undefined && next < min) return;
      el.value = String(next);
      onChange?.(next);
    };

    return (
      <div className="flex items-stretch gap-2">
        <div className="flex-1">
          <Input
            {...(props as any)}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as any).current = node;
            }}
            type="number"
          />
        </div>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={handleInc}
            className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded font-bold cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center text-sm select-none"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleDec}
            className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded font-bold cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center text-sm select-none"
          >
            −
          </button>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";
