'use server'

import LoginRepository from "./LoginRepository";
import {redirect} from "next/navigation";
import Constants from "../../Constants";

export interface LoginSubmitOutput {
    success?: boolean;
    errors?: string | null;
}

// TODO posso astrarre questo submit e questo output e passare sempre quello
export const LoginSubmitAction = async (
    _prevState: LoginSubmitOutput,
    formData: FormData) : Promise<LoginSubmitOutput>  => {

    try {
        await LoginRepository.loginAsync(
            formData.get('username') as string,
            formData.get('plainTextPassword') as string);
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

    // Lo metto fuori perché internamento il redirect funziona tirando un'eccezione,
    // e se la mangio non funziona il redirect
    redirect(Constants.AdminPageSlug);
}
