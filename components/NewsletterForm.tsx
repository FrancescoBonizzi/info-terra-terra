'use client'

import React, {FormEvent} from "react";
import Constants from "../Constants";
import NewsletterRepository from "../services/database/newsletter/NewsletterRepository";
import {BounceLoader} from "react-spinners";

export const NewsletterForm = () => {

    const [success, setSuccess] = React.useState(false);
    const [errors, setErrors] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const onSendEmailAddress = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const formData = new FormData(event.currentTarget)

        try {
            setIsLoading(true);
            await NewsletterRepository.insertEmailAddressAsync(
                formData.get('email') as string);
            setSuccess(true);
        }
        catch (ex) {
            if (ex instanceof Error) {
                setErrors(ex.message);
            }
            else {
                setErrors('Errore generico');
            }
        }
        finally {
            setIsLoading(false);
        }
    }

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
            {success &&
                <div className="transparent-rounded-form max-width-25rem text-color-success">
                    <h4 className="padding0 margin0 text-align-center">Grazie per esserti iscritto alla newsletter! A presto!</h4>
                </div>
            }

            {!success &&
                <form onSubmit={onSendEmailAddress}
                    className="margin-top-2rem transparent-rounded-form">

                    <p>
                        Se vuoi rimanere aggiornato sulle nostre attività, lasciaci la tua email, per favore.
                    </p>

                    <p>Non preoccuparti, la tua <a href={Constants.PrivacyPageSlug}
                                                   className="action-button-secondary">privacy</a> è assolutamente al
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
                    <h4 className="padding0 margin0 text-align-center">@Model.Errors</h4>
                </div>
            }
        </>
    )
}