import type { AuthTheme } from "./types";

/**
 * Modern Minimal theme — clean white card, soft shadows, rounded corners.
 * Best for: SaaS products, developer tools, modern consumer apps.
 */
export const minimal: AuthTheme = {
    page: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4",
    card: "w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden",
    header: "flex flex-col items-center gap-3 px-8 pt-8",
    cardBody: "px-8 pb-8 pt-6 space-y-6",
    title: "text-2xl font-semibold text-slate-900 text-center",
    input: "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors",
    inputError: "border-red-400 focus:border-red-500 focus:ring-red-500/20",
    label: "block text-sm font-medium text-slate-700 mb-1.5",
    buttonPrimary: "w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
    buttonSecondary: "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:ring-offset-2 transition-colors",
    link: "text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors",
    errorMessage: "text-sm text-red-600 mt-1",
    alert: {
        success: "rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm",
        warning: "rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 text-sm",
        error: "rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm",
        info: "rounded-lg bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 text-sm"
    },
    divider: "relative my-6 flex items-center text-sm text-slate-400 before:flex-1 before:border-t before:border-slate-200 after:flex-1 after:border-t after:border-slate-200",
    socialButton: "flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors",
    checkbox: "flex items-center gap-2 text-sm text-slate-600",
    muted: "text-sm text-slate-500"
};
