'use client'

import React from "react";
import Constants from "../Constants";
import {BounceLoader} from "react-spinners";
import Link from "next/link";

// TODO: quando non sarà experimental, leva il @ts-ignore e metti l'import corretto
// @ts-ignore
import { experimental_useFormStatus as useFormStatus, experimental_useFormState as useFormState } from "react-dom";
import {newsletterSubmitAction, NewsletterSubmitOutput} from "../actions/newsletterSubmitAction";

const initialState : NewsletterSubmitOutput = {}

export const NewsletterForm = () => {

    const formStatus = useFormStatus();
    const isLoading = formStatus.pending;

    const [state, formAction] = useFormState(newsletterSubmitAction, initialState);
    const isSuccess = state.success;
    const errors = state.errors;

    if (isLoading) {
        return (
            <div className="transparent-rounded-form max-width-25rem text-color-success">
                <h4 className="padding0 margin0 text-align-center">
                    <BounceLoader
                        color='#86C342'
                        loading={isLoading}
                        size={150}
                    />
                </h4>
            </div>
        );
    }

    return (
        <>
            {isSuccess &&
                <div className="transparent-rounded-form max-width-25rem text-color-success">
                    <h4 className="padding0 margin0 text-align-center">Grazie per esserti iscritto alla newsletter! A presto!</h4>
                </div>
            }

            {!isSuccess &&
                <form action={formAction}
                    className="margin-top-2rem transparent-rounded-form">

                    <p>
                        Se vuoi rimanere aggiornato sulle nostre attività, lasciaci la tua email, per favore.
                    </p>

                    <p>Non preoccuparti, la tua <Link href={Constants.PrivacyPageSlug}
                                                   className="action-button-secondary">privacy</Link> è assolutamente al
                        sicuro!</p>

                    <div className="form-row">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required/>
                    </div>

                    <div className="form-row">
                        <input type="submit" value="Iscriviti"/>
                    </div>

                </form>
            }

            {errors &&
                <div className="transparent-rounded-form max-width-25rem text-color-error padding0 margin0">
                    <h4 className="padding0 margin0 text-align-center">{errors}</h4>
                </div>
            }
        </>
    )
}