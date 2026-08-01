/**
 * Theme contract for the auth pages (login, register, etc.).
 * Each theme provides a set of Tailwind class strings keyed by semantic role.
 * All class strings must be static literals (not dynamically constructed)
 * so Tailwind's content scanner can find and include them.
 */
export interface AuthTheme {
    /** Full-page background wrapper */
    page: string;
    /** The centered card container */
    card: string;
    /** Logo / brand area at top of card */
    header: string;
    /** Content area below the header (provides padding when card uses overflow-hidden) */
    cardBody: string;
    /** Page title (e.g. "Sign in to your account") */
    title: string;
    /** Form input fields */
    input: string;
    /** Input in error state (appended to input) */
    inputError: string;
    /** Labels above inputs */
    label: string;
    /** Primary action button (e.g. "Sign In") */
    buttonPrimary: string;
    /** Secondary/outline button */
    buttonSecondary: string;
    /** Text links (e.g. "Forgot password?") */
    link: string;
    /** Error/validation message text */
    errorMessage: string;
    /** Alert banners (success, warning, error, info) */
    alert: {
        success: string;
        warning: string;
        error: string;
        info: string;
    };
    /** Divider/separator (e.g. "or continue with") */
    divider: string;
    /** Social provider buttons */
    socialButton: string;
    /** Checkbox + label wrapper */
    checkbox: string;
    /** Subtle/secondary text */
    muted: string;
}
