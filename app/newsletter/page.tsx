import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import React from "react";
import {NewsletterForm} from "../../components/NewsletterForm";

const title = 'Newsletter';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.NewsletterPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Se vuoi rimanere aggiornato sulle nostre attività, lasciaci la tua email. Ti terremo informato su come puoi aiutarci a diffondere la nostra missione e a fare la differenza.'
);

export default function Page() {
    return (
        <div className="flex-horizontal-center height100vh bg-forest-1">
            <NewsletterForm />
        </div>
    );
};