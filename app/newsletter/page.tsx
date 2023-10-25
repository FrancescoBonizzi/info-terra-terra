import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import React from "react";
import NewsletterRepository from "../../services/database/newsletter/NewsletterRepository";

const title = 'Newsletter';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.NewsletterPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Se vuoi rimanere aggiornato sulle nostre attività, lasciaci la tua email. Ti terremo informato su come puoi aiutarci a diffondere la nostra missione e a fare la differenza.'
);

export default function Page() {

    const [success, setSuccess] = React.useState(false);
    const [errors, setErrors] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    async function onSendEmailAddress(formData: FormData) {
        'use server'

        try {
            setIsLoading(true);
            await NewsletterRepository.insertEmailAddressAsync(
                formData.get('email') as string);
            setSuccess(true);
        }
        catch (ex) {
            if (ex instanceof Error)
                setErrors(ex.message);
            else
                setErrors('Errore generico');
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex-horizontal-center height100vh bg-forest-1">

            {success &&
                <div className="transparent-rounded-form max-width-25rem text-color-success">
                    <h4 className="padding0 margin0 text-align-center">{success}</h4>
                </div>
            }

            {isLoading &&
                <div className="transparent-rounded-form max-width-25rem text-color-success">
                    <h4 className="padding0 margin0 text-align-center">Caricamento...</h4>
                </div>
            }

            {!success &&
                <form
                    action={onSendEmailAddress}
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

        </div>
    );
};