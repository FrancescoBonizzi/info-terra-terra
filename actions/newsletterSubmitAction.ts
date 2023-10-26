'use server'

import NewsletterRepository from "../services/database/newsletter/NewsletterRepository";

export interface NewsletterSubmitOutput {
    success?: boolean;
    errors?: string | null;
}

export const newsletterSubmitAction = async (
    _prevState: NewsletterSubmitOutput,
    formData: FormData) : Promise<NewsletterSubmitOutput>  => {

    try {
        await NewsletterRepository.insertEmailAddressAsync(
            formData.get('email') as string);
    }
    catch (ex) {
        if (ex instanceof Error) {
            return {
                errors: ex.message
            }
        }
        else {
            return {
                errors: 'Errore generico'
            }
        }
    }

    return {
        success: true
    }
}
