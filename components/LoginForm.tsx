'use client'

import React from "react";
import {FormSubmitButton} from "./FormSubmitButton";
import {FormError} from "./FormError";
import {signIn} from "next-auth/react";
import {redirect} from "next/navigation";
import Constants from "../Constants";
import {loginCredentialsProviderName} from "../services/AuthConfig";

export const LoginForm = () => {

    const [errors, setErrors] = React.useState<string>();

    const onSubmitHandler = async (formData: FormData) => {

        const credential = {
            username: formData.get("username") as string,
            plainTextPassword: formData.get("plainTextPassword") as string,
        }

        // TODO: console.log qua non va??
        //  il problema di tutto è che alle Api non arrivano i dati, boh!

        const result = await signIn(
            loginCredentialsProviderName,
            {...credential, redirect: false});
        if (result?.ok)
            // NB: questo redirect non deve mai stare dentro ad un catch
            // perchè per funzionare tira un'eccezione.
        {
            redirect(Constants.AdminPageSlug);
        }
        else {
            setErrors(result?.error as string);
        }
    }

    return (
        <form action={onSubmitHandler}
              className="margin-top-2rem transparent-rounded-form">

            <div className="form-row">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required/>
            </div>

            <div className="form-row">
                <label htmlFor="plainTextPassword">Password:</label>
                <input type="password" id="plainTextPassword" name="plainTextPassword" required/>
            </div>

            <FormSubmitButton text={"Login"}/>

            <FormError errors={errors}/>
        </form>
    )
}