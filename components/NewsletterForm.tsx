'use client'

import React from "react";
import Constants from "../Constants";
import Link from "next/link";

import { useFormState } from "react-dom";
import {NewsletterSubmitAction, NewsletterSubmitOutput} from "../dataLayer/newsletter/NewsletterSubmitAction";
import {FormSubmitButton} from "./FormSubmitButton";
import {FormError} from "./FormError";

const initialState : NewsletterSubmitOutput = {}

export const NewsletterForm = () => {

    // NB: useFormStatus funziona solo dentro ai figli di un componente che ha il padre con <form>
    const [state, formAction] = useFormState(NewsletterSubmitAction, initialState);
    const isSuccess = state.success;
    const errors = state.errors;

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

                    <FormSubmitButton text={"Iscriviti"}/>
                    <FormError errors={errors} />

                </form>
            }

        </>
    )
}