import React from "react";
import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import {LoginForm} from "../../components/LoginForm";

const title = 'Login';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.LoginPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Area riservata per gli amministratori del sito.'
)

export default function Page(){

    return (
        <div className="flex-horizontal-center height100vh bg-forest-1">
            <LoginForm />
        </div>
    );

}