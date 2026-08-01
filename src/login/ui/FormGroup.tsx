import type { ReactNode } from "react";

export interface FormGroupProps {
    children: ReactNode;
    className?: string;
}

/**
 * Vertical spacing wrapper for a label + input + error group.
 */
export function FormGroup({ children, className }: FormGroupProps) {
    const classes = ["space-y-1", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
}
