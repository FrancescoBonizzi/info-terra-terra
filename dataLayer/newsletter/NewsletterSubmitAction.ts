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

    let output: NewsletterSubmitOutput = {
        success: false,
        errors: null
    };

    try {
        await NewsletterRepository.insertEmailAddressAsync(
            formData.get('email') as string);
        output.success = true;
    }
    catch (ex) {
        if (ex instanceof Error) {
            output.errors = ex.message;
            output.success = false;
        }
        else {
            output.errors = 'Errore generico';
            output.success = false;
        }
    }

    return output;
}
