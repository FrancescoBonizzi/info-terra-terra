// TODO: è un problema per il secret!
//import 'server-only';

import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import type {NextAuthOptions} from "next-auth";
import {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Constants from "../Constants";

// TODO: usa il middleware per decidere cosa è sotto auth

export const loginCredentialsProviderName = "login";
export const authConfig = {
    secret: 'pane-anguria-alberi-giardini-lavandini-metano',
    providers: [
        CredentialsProvider({
            id: loginCredentialsProviderName,
            name: loginCredentialsProviderName,
            type: "credentials",
            // Non mi servono a niente perché chiamo io signin, ma vabbè
            credentials: {
                email: {label: "Email", type: "text", placeholder: "Email"},
                plainTextPassword: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials, req) {

                const res = await fetch(
                     req.headers!.origin + Constants.LoginApiPath,
                    {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {"Content-Type": "application/json"}
                    })

                if (res.ok) {
                    return await res.json();
                }

                throw new Error("Autenticazione fallita");
            }
        }),
    ],
    pages: {
        signIn: Constants.LoginPageSlug,
        error: "/"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    }
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authConfig)
}