import {VolantinoPreviewCard} from "../components/VolantinoPreviewCard";
import Constants from "../Constants";
import {MetaDataHelper} from "../services/MetaDataHelper";
import React from "react";
import Link from "next/link";
import VolantiniRepository from "../dataLayer/volantini/VolantiniRepository";

export const metadata = MetaDataHelper.generateMetadata(
    Constants.HomePageSlug,
    `Home page - ${Constants.SiteTitle}`,
    'Info Terra Terra è un sito dedicato a fornire informazioni sulle questioni ambientali più urgenti. ' +
    'Scopri come puoi fare la differenza e aiutarci a creare un mondo migliore per tutti.'
);

export default function Page() {

    return (
        <>
            <section className="bg-forest-2">
                <div className="section-content">
                    <h1>La conoscenza</h1>
                    <h2>è il primo passo per il cambiamento</h2>
                </div>
            </section>

            <section>
                <div className="section-content">
                    <p>
                        La nostra <strong>missione</strong> è fornire informazioni accurate
                        e aggiornate sulle questioni ambientali più urgenti,
                        perché crediamo che la conoscenza sia il primo passo per il cambiamento.
                    </p>

                    <p>
                        Attraverso i nostri volantini, i nostri articoli e le nostre iniziative,
                        speriamo di <strong>ispirare</strong> azioni concrete
                        e di sensibilizzare sempre più persone sulla necessità
                        di proteggere il nostro pianeta per le generazioni future.
                    </p>

                    <Link className="action-button margin-top-1rem" href={Constants.ManifestoPageSlug}>Scopri di
                        più</Link>
                </div>
            </section>

            <section className="bg-alt">
                <div className="section-content">
                    <h3><strong>Gli ultimi volantini</strong></h3>

                    {VolantiniRepository.getAll().map((volantino) =>
                        <VolantinoPreviewCard key={volantino.id} {...volantino} />
                    )}

                    <Link className="action-button margin-top-1rem" href={Constants.VolantiniPageSlug}>Guarda tutti i
                        volantini</Link>
                </div>
            </section>

            <section>
                <div className="section-content">
                    <h3>
                        <strong>Aiutaci</strong>
                    </h3>

                    <p>
                        Siamo una piccola organizzazione con grandi idee per rendere il mondo un posto migliore.
                    </p>

                    <p>
                        Ma per farlo, <strong>abbiamo bisogno del tuo aiuto!</strong> Ci sono molte cose che puoi fare
                        per sostenerci:
                    </p>

                    <ul>
                        <li><strong>Stampare</strong> i nostri volantini e <strong>distribuirli</strong> nella tua
                            comunità
                        </li>
                        <li>
                            <strong>Condividere</strong> le nostre iniziative. Ricorda: <strong>
                            anche una sola persona che inizia a riflettere
                            su questi temi grazie a noi, è un successo!
                        </strong>
                        </li>
                        <li>Lasciarci la tua email per ricevere aggiornamenti sulle nostre attività</li>
                    </ul>

                    <p>
                        <strong>Ogni piccola azione può fare la differenza</strong>
                    </p>

                    <Link className="action-button margin-top-1rem" href={Constants.AiutaciPageSlug}>Scopri come puoi
                        aiutare</Link>

                </div>
            </section>

        </>
    );
}