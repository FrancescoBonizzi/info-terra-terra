'use client'

import {LoginSubmitAction, LoginSubmitOutput} from "../dataLayer/login/LoginSubmitAction";
import {useFormState} from "react-dom";
import React from "react";
import {FormSubmitButton} from "./FormSubmitButton";
import {FormError} from "./FormError";

const initialState : LoginSubmitOutput = {}
export const LoginForm = () => {

    // NB: useFormStatus funziona solo dentro ai figli di un componente che ha il padre con <form>
    const [state, formAction] = useFormState(LoginSubmitAction, initialState);
    const isSuccess = state.success;
    const errors = state.errors;

    return (
        <>
            {!isSuccess &&
                <form action={formAction}
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

                    <FormError errors={errors} />
                </form>
            }


        </>
    )
}