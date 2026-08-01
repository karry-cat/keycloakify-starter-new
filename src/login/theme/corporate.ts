import type { AuthTheme } from "./types";

/**
 * Corporate theme — structured, professional, branded header band.
 * Best for: Enterprise SSO portals, B2B platforms, internal tools.
 */
export const corporate: AuthTheme = {
    page: "min-h-screen bg-slate-900 flex flex-col",
    card: "w-full max-w-md mx-auto mt-16 bg-white rounded-lg shadow-2xl overflow-hidden",
    header: "bg-slate-800 px-8 py-6 flex flex-col items-center gap-2",
    cardBody: "px-8 py-6 space-y-5",
    title: "text-xl font-bold text-white text-center",
    input: "w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none transition-colors",
    inputError: "border-red-500 focus:border-red-600 focus:ring-red-600",
    label: "block text-sm font-semibold text-gray-800 mb-1",
    buttonPrimary: "w-full rounded bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white uppercase tracking-wide shadow hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
    buttonSecondary: "w-full rounded border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 uppercase tracking-wide shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:ring-offset-2 transition-colors",
    link: "text-sm font-semibold text-indigo-700 hover:text-indigo-900 underline underline-offset-2 transition-colors",
    errorMessage: "text-sm text-red-700 font-medium mt-1",
    alert: {
        success: "rounded bg-green-100 border-l-4 border-green-600 text-green-900 px-4 py-3 text-sm font-medium",
        warning: "rounded bg-amber-100 border-l-4 border-amber-600 text-amber-900 px-4 py-3 text-sm font-medium",
        error: "rounded bg-red-100 border-l-4 border-red-600 text-red-900 px-4 py-3 text-sm font-medium",
        info: "rounded bg-blue-100 border-l-4 border-blue-600 text-blue-900 px-4 py-3 text-sm font-medium"
    },
    divider: "relative my-6 flex items-center text-xs font-semibold uppercase tracking-wider text-gray-400 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300",
    socialButton: "flex items-center justify-center gap-2 rounded border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors",
    checkbox: "flex items-center gap-2 text-sm text-gray-700 font-medium",
    muted: "text-sm text-gray-500"
};
