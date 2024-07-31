import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import LinksHelper from "../../services/LinksHelper";
import React from "react";
import Link from "next/link";

const title = 'Aiutaci';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.AiutaciPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Ci sono molte cose che puoi fare per aiutarci a creare un futuro più sostenibile. Scopri come!'
)

export default function Page() {

    return (
            <article>

                <section>
                    <div className="section-content">
                        <h1>{title}</h1>
                        <h2>Ci sono molte cose che puoi fare per aiutarci a creare un futuro più sostenibile</h2>
                    </div>
                </section>

                <section className="bg-alt">
                    <div className="section-content">
                        <h3><strong>Distribuisci</strong></h3>
                        <p>
                            Distribuisci i nostri <Link href={Constants.VolantiniPageSlug}
                                                     className="action-button-secondary">volantini</Link>:
                            stampa le nostre brochure informative e distribuiscile nel tuo bar di fiducia,
                            dalli ai tuoi amici, appendilo in qualche bacheca - diffondi nella tua comunità
                            il nostro messaggio.
                        </p>

                        <p>
                            <a href={LinksHelper.mailto} className="action-button-secondary">Se ci contatti</a>,
                            ti forniremo una versione del volantino con un QRCode adatto per ottenere <strong>statistiche
                            sull&apos;efficacia</strong> del tuo volantinaggio.
                            Potremo dirti, per esempio, in quali zone è stato aperto di più il sito
                            a partire dai volantini che hai distribuito.
                        </p>

                        <Link href={Constants.VolantiniPageSlug} className="action-button">Scarica un volantino</Link>
                    </div>
                </section>

                <section>
                    <div className="section-content">
                        <h3><strong>Condividi</strong></h3>
                        <p>
                            Parla di noi. Parla della nostra iniziativa, parla dei nostri volantini,
                            falli vedere in giro, o semplicemente linka questo sito a qualcuno.
                            Se anche una persona in più si informa, avremo fatto un grande passo avanti.
                        </p>
                    </div>
                </section>

                <section className="bg-cta text-white">
                    <div className="section-content">
                        <h3 className="margin0 padding0"><strong>Grazie</strong> per il tuo supporto!</h3>
                    </div>
                </section>

            </article>
    );
}