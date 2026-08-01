/**
 * Custom Register page (register.ftl) — styled with Tailwind via theme system.
 *
 * Uses the same AuthTemplate and UI primitives as Login for visual consistency.
 * Supports: Keycloakify's UserProfileFormFields for dynamic profile attributes.
 */
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { activeTheme } from "../theme";
import { Button } from "../ui";

type RegisterKcContext = Extract<KcContext, { pageId: "register.ftl" }>;

export default function Register(
    props: PageProps<RegisterKcContext, I18n> & {
        UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps<RegisterKcContext, I18n>) => JSX.Element>;
        doMakeUserConfirmPassword: boolean;
    }
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey, termsAcceptanceRequired } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.existsError("global")}
            headerNode={msg("registerTitle")}
            displayInfo={false}
            infoNode={null}
        >
            <form id="kc-register-form" action={url.registrationAction} method="post" className="space-y-4">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                {termsAcceptanceRequired && (
                    <div className={activeTheme.checkbox}>
                        <input id="termsAccepted" name="termsAccepted" type="checkbox" required className="rounded border-slate-300" />
                        <label htmlFor="termsAccepted">{msg("acceptTerms")}</label>
                    </div>
                )}

                {recaptchaRequired && recaptchaSiteKey && (
                    <div className="g-recaptcha" data-sitekey={recaptchaSiteKey} data-size="normal" />
                )}

                <div className="flex flex-col gap-3 pt-2">
                    <Button type="submit" disabled={!isFormSubmittable}>
                        {msgStr("doRegister")}
                    </Button>
                    <a href={url.loginUrl} className={`text-center ${activeTheme.link}`}>
                        {msg("backToLogin")}
                    </a>
                </div>
            </form>
        </Template>
    );
}
