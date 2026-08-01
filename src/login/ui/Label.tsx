import type { LabelHTMLAttributes } from "react";
import { activeTheme } from "../theme";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * Themed label for form fields.
 */
export function Label({ className, ...props }: LabelProps) {
    const classes = [activeTheme.label, className].filter(Boolean).join(" ");
    return <label className={classes} {...props} />;
}
