/**
 * Custom Login page (login.ftl) — fully styled with Tailwind via theme system.
 *
 * Uses AuthTemplate as the page shell and UI primitives for form elements.
 * Supports: username/password, remember me, forgot password, social providers,
 * WebAuthn passkey conditional UI.
 */
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useScript } from "keycloakify/login/pages/Login.useScript";
import { activeTheme } from "../theme";
import { Button, Input, PasswordInput, Label, FormGroup } from "../ui";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField, enableWebAuthnConditionalUI, authenticators } =
        kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const webAuthnButtonId = "authenticateWebAuthnButton";
    useScript({ webAuthnButtonId, kcContext, i18n });

    const hasFieldError = messagesPerField.existsError("username", "password");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!hasFieldError}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <span>
                    {msg("noAccount")}{" "}
                    <a href={url.registrationUrl} className={activeTheme.link}>
                        {msg("doRegister")}
                    </a>
                </span>
            }
            socialProvidersNode={<SocialProviders social={social} realm={realm} i18n={i18n} />}
        >
            {realm.password && (
                <form
                    id="kc-form-login"
                    onSubmit={() => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                    className="space-y-4"
                >
                    {/* Username / Email */}
                    {!usernameHidden && (
                        <FormGroup>
                            <Label htmlFor="username">
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")}
                            </Label>
                            <Input
                                tabIndex={2}
                                id="username"
                                name="username"
                                defaultValue={login.username ?? ""}
                                type="text"
                                autoFocus
                                autoComplete={enableWebAuthnConditionalUI ? "username webauthn" : "username"}
                                aria-invalid={hasFieldError}
                                hasError={hasFieldError}
                            />
                            {hasFieldError && (
                                <p
                                    className={activeTheme.errorMessage}
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                    }}
                                />
                            )}
                        </FormGroup>
                    )}

                    {/* Password */}
                    <FormGroup>
                        <Label htmlFor="password">{msg("password")}</Label>
                        <PasswordInput
                            tabIndex={3}
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            aria-invalid={hasFieldError}
                            hasError={hasFieldError}
                        />
                        {usernameHidden && hasFieldError && (
                            <p
                                className={activeTheme.errorMessage}
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                }}
                            />
                        )}
                    </FormGroup>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between">
                        {realm.rememberMe && !usernameHidden && (
                            <label className={activeTheme.checkbox}>
                                <input
                                    tabIndex={5}
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    defaultChecked={!!login.rememberMe}
                                    className="rounded border-slate-300"
                                />
                                {msg("rememberMe")}
                            </label>
                        )}
                        {realm.resetPasswordAllowed && (
                            <a tabIndex={6} href={url.loginResetCredentialsUrl} className={activeTheme.link}>
                                {msg("doForgotPassword")}
                            </a>
                        )}
                    </div>

                    {/* Submit */}
                    <input type="hidden" name="credentialId" value={auth.selectedCredential} />
                    <Button type="submit" tabIndex={7} disabled={isLoginButtonDisabled}>
                        {msgStr("doLogIn")}
                    </Button>
                </form>
            )}

            {/* WebAuthn Conditional UI */}
            {enableWebAuthnConditionalUI && (
                <WebAuthnSection
                    url={url}
                    authenticators={authenticators}
                    webAuthnButtonId={webAuthnButtonId}
                    msgStr={msgStr}
                />
            )}
        </Template>
    );
}

/* ─── Sub-components ────────────────────────────────────────────────────── */

function SocialProviders({ social, realm, i18n }: { social: any; realm: any; i18n: I18n }) {
    const { msg } = i18n;

    if (!realm.password || !social?.providers?.length) return null;

    return (
        <div className="space-y-4">
            <div className={activeTheme.divider}>
                <span className="px-3 bg-white">{msg("identity-provider-login-label")}</span>
            </div>
            <div className="grid gap-2">
                {social.providers.map((p: any) => (
                    <a key={p.alias} href={p.loginUrl} className={activeTheme.socialButton}>
                        {p.iconClasses && <i className={p.iconClasses} aria-hidden="true" />}
                        <span dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }} />
                    </a>
                ))}
            </div>
        </div>
    );
}

function WebAuthnSection({ url, authenticators, webAuthnButtonId, msgStr }: { url: any; authenticators: any; webAuthnButtonId: string; msgStr: any }) {
    return (
        <>
            <form id="webauth" action={url.loginAction} method="post">
                <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                <input type="hidden" id="authenticatorData" name="authenticatorData" />
                <input type="hidden" id="signature" name="signature" />
                <input type="hidden" id="credentialId" name="credentialId" />
                <input type="hidden" id="userHandle" name="userHandle" />
                <input type="hidden" id="error" name="error" />
            </form>

            {authenticators?.authenticators?.length > 0 && (
                <form id="authn_select">
                    {authenticators.authenticators.map((a: any, i: number) => (
                        <input key={i} type="hidden" name="authn_use_chk" readOnly value={a.credentialId} />
                    ))}
                </form>
            )}

            <Button id={webAuthnButtonId} type="button" variant="secondary">
                {msgStr("passkey-doAuthenticate")}
            </Button>
        </>
    );
}
