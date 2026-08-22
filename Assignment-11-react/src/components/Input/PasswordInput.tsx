import React, { useState } from "react";
import { Input, type InputProps } from "./Input";
import { Eye, EyeOff } from "lucide-react";

type Props = Omit<InputProps, "type" | "rightIcon">;

export const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [show, setShow] = useState(false);
    return (
      <Input
        {...props}
        ref={ref}
        type={show ? "text" : "password"}
        rightIcon={
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((s) => !s)}
            className="p-1 rounded text-gray-500 hover:text-gray-700 transition-colors cursor-pointer flex items-center justify-center"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";
