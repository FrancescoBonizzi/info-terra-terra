import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import React from "react";
import {VolantinoPreviewCard} from "../../components/VolantinoPreviewCard";
import VolantiniRepository from "../../dataLayer/volantini/VolantiniRepository";

const title = 'Volantini';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.VolantiniPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Tutti i volantini pubblicati da Info Terra Terra.'
);

export default function Page() {
    return (
        <article>

            <section>
                <div className="section-content">
                    <h1>{title}</h1>
                    <h2>Tutte le nostre grafiche consultabili e scaricabili</h2>
                </div>
            </section>

            <section className="bg-alt">
                <div className="section-content">

                    {VolantiniRepository.getAll().map((volantino) =>
                        <VolantinoPreviewCard key={volantino.id} {...volantino} />
                    )}

                </div>
            </section>

        </article>
    );
}
