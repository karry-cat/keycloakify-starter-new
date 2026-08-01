import type { ButtonHTMLAttributes } from "react";
import { activeTheme } from "../theme";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

/**
 * Themed button. Defaults to "primary" variant.
 */
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
    const base = variant === "primary" ? activeTheme.buttonPrimary : activeTheme.buttonSecondary;
    const classes = [base, className].filter(Boolean).join(" ");

    return <button className={classes} {...props} />;
}
