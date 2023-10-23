import {VolantinoIndexCard} from "../components/Volantino";
import {AllVolantini} from "../data/AllVolantini";
import Constants from "../Constants";
import {MetaDataHelper} from "../services/MetaDataHelper";

export const metadata = MetaDataHelper.generateMetadata(
    '/',
    `Home page - ${Constants.SiteTitle}`,
    'Info Terra Terra è un sito dedicato a fornire informazioni sulle questioni ambientali più urgenti. ' +
    'Scopri come puoi fare la differenza e aiutarci a creare un mondo migliore per tutti.'
);

export default function HomePage() {

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

                    <a className="action-button margin-top-1rem" href="/manifesto">Scopri di più</a>
                </div>
            </section>

            <section className="bg-alt">
                <div className="section-content">
                    <h3><strong>Gli ultimi volantini</strong></h3>

                    {AllVolantini.map((volantino) =>
                        <VolantinoIndexCard key={volantino.id} {...volantino} />
                    )}

                    <a className="action-button margin-top-1rem" href="/volantini">Guarda tutti i volantini</a>
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
                        Ma per farlo, <strong>abbiamo bisogno del tuo aiuto!</strong>
                        Ci sono molte cose che puoi fare per sostenerci:
                    </p>

                    <ul>
                        <li><strong>Stampare</strong> i nostri volantini e <strong>distribuirli</strong> nella tua
                            comunità
                        </li>
                        <li>
                            <strong>Condividere</strong> le nostre iniziative. Ricorda:
                            <strong>
                                anche una sola persona che inizia a riflettere
                                su questi temi grazie a noi, è un successo!
                            </strong>
                        </li>
                        <li>Lasciarci la tua email per ricevere aggiornamenti sulle nostre attività</li>
                    </ul>

                    <p>
                        <strong>Ogni piccola azione può fare la differenza</strong>
                    </p>

                    <a className="action-button margin-top-1rem" href="/aiutaci">Scopri come puoi aiutare</a>

                </div>
            </section>

            <section className="bg-cta text-white">
                <div className="section-content">
                    <h3><strong>Rimaniamo in contatto</strong></h3>

                    <p>
                        Se vuoi rimanere aggiornato sulle nostre attività
                        lasciaci la tua <strong>mail</strong>, per favore. Non ti disturberemo, promesso!
                    </p>

                    <a className="action-button margin-top-1rem" href="/newsletter">Iscriviti alla newsletter</a>
                </div>
            </section>
        </>
    );
};