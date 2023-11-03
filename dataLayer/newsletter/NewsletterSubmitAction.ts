'use server'

import NewsletterRepository from "./NewsletterRepository";

export interface NewsletterSubmitOutput {
    success?: boolean;
    errors?: string | null;
}

// TODO posso astrarre questo submit e questo output e passare sempre quello
export const NewsletterSubmitAction = async (
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
