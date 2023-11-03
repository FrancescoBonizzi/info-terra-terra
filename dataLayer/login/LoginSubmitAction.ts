'use server'

import {redirect} from "next/navigation";
import Constants from "../../Constants";
import {signIn} from "next-auth/react";

export interface LoginSubmitOutput {
    success?: boolean;
    errors?: string | null;
}

// TODO posso astrarre questo submit e questo output e passare sempre quello
export const LoginSubmitAction = async (
    _prevState: LoginSubmitOutput,
    formData: FormData): Promise<LoginSubmitOutput> => {

    const credential = {
        email: formData.get("email") as string,
        plainTextPassword: formData.get("plainTextPassword") as string,
    }

    const result = await signIn(
        "login",
        {...credential, redirect: false});
    if (result?.ok)
        // NB: questoo redirect non deve mai stare dentro ad un catch
        // perchè per funzionare tira un'eccezione.
    {
        redirect(Constants.AdminPageSlug);
    }
    else {
        return {
            success: false,
            errors: result?.error,
        }
    }
}
