/**
 * Theme barrel file.
 * ─────────────────
 * Switch the active theme by changing this single import.
 * Both themes are exported for reference; `activeTheme` is what
 * the templates and pages consume.
 */
export type { AuthTheme } from "./types";
export { minimal } from "./minimal";
export { corporate } from "./corporate";

// ━━━ Change this line to switch themes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// import { minimal } from "./minimal";
import { corporate } from "./corporate";

// export const activeTheme = minimal;
export const activeTheme = corporate;
