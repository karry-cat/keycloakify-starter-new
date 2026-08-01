/**
 * AuthTemplate — Custom template for auth pages (login, register, etc.).
 *
 * This replaces Keycloak's default Template for pages you want fully styled
 * with Tailwind. Pages that don't use this template still get the default
 * Keycloak look via the original Template.tsx.
 *
 * Responsibilities:
 * - Page layout (centered card)
 * - Header / branding
 * - Alert messages
 * - Language switcher
 * - Info/registration links area
 *
 * This is intentionally a Keycloakify-compatible TemplateProps consumer,
 * so it can be passed to page components the same way the default Template is.
 */
import { useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { activeTheme } from "../theme";

export default function AuthTemplate(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        kcContext,
        i18n,
        doUseDefaultCss,
        children
    } = props;

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
    const { realm, message, isAppInitiatedAction, url, auth } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
    }, []);

    // Keycloakify initialization (loads scripts, etc.) — still needed even without default CSS
    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={activeTheme.page}>
            <div className={activeTheme.card}>
                {/* Header */}
                <div className={activeTheme.header}>
                    <h1 className={activeTheme.title}>{headerNode}</h1>
                    {realm.displayName && (
                        <p className={activeTheme.muted}>{realm.displayName}</p>
                    )}
                </div>

                {/* Card Body — padded content area below header */}
                <div className={activeTheme.cardBody}>
                    {/* Language Switcher */}
                    {enabledLanguages.length > 1 && (
                        <div className="flex justify-end">
                            <select
                                className="text-sm border border-slate-200 rounded px-2 py-1 bg-transparent"
                                value={currentLanguage.languageTag}
                                onChange={e => {
                                    const lang = enabledLanguages.find(l => l.languageTag === e.target.value);
                                    if (lang) window.location.href = lang.href;
                                }}
                            >
                                {enabledLanguages.map(({ languageTag, label }) => (
                                    <option key={languageTag} value={languageTag}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Alert Messages */}
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <div
                            className={activeTheme.alert[message.type]}
                            dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                        />
                    )}

                    {/* Page Content (login form, register form, etc.) */}
                    {children}

                    {/* Social Providers */}
                    {socialProvidersNode}

                    {/* Try Another Way */}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <a
                                href="#"
                                className={activeTheme.link}
                                onClick={e => {
                                    document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                    e.preventDefault();
                                }}
                            >
                                {msg("doTryAnotherWay")}
                            </a>
                        </form>
                    )}

                    {/* Info Area (e.g. "Don't have an account? Register") */}
                    {displayInfo && infoNode && (
                        <div className={`text-center ${activeTheme.muted}`}>
                            {infoNode}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
