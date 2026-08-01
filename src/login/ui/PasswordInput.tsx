import { useState, forwardRef, type InputHTMLAttributes } from "react";
import { activeTheme } from "../theme";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    hasError?: boolean;
}

/**
 * Password input with integrated show/hide toggle.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ hasError, className, ...props }, ref) => {
    const [revealed, setRevealed] = useState(false);

    const inputClasses = [activeTheme.input, hasError && activeTheme.inputError, "pr-10", className].filter(Boolean).join(" ");

    return (
        <div className="relative">
            <input ref={ref} type={revealed ? "text" : "password"} className={inputClasses} {...props} />
            <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setRevealed(prev => !prev)}
                aria-label={revealed ? "Hide password" : "Show password"}
            >
                {revealed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.092 1.092a4 4 0 00-5.558-5.558z"
                            clipRule="evenodd"
                        />
                        <path d="M10.748 13.93l2.523 2.523A9.987 9.987 0 0110 17c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 012.838-4.826L6.29 8.17a4 4 0 004.458 5.76z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                        <path
                            fillRule="evenodd"
                            d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
