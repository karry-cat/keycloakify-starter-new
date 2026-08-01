import { forwardRef, type InputHTMLAttributes } from "react";
import { activeTheme } from "../theme";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** When true, applies error styling */
    hasError?: boolean;
}

/**
 * Themed text input. Consumes `activeTheme.input` and appends
 * error styles when `hasError` is set.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({ hasError, className, ...props }, ref) => {
    const classes = [activeTheme.input, hasError && activeTheme.inputError, className].filter(Boolean).join(" ");

    return <input ref={ref} className={classes} {...props} />;
});

Input.displayName = "Input";
