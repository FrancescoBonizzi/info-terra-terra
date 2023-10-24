import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";

const title = 'Manifesto';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.ManifestoPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Il nostro contributo per un futuro sostenibile: breve e incisivo, basato sulla scienza, accessibile.'
);

export default function Page() {

    return (
        <>
            <article>

                <section>
                    <div className="section-content">
                        <h1>{title}</h1>
                        <h2>Il nostro contributo per un futuro sostenibile</h2>
                    </div>
                </section>

                <section className="section-forest">

                    <div className="section-content-right bg-white text-black">
                        <span className="jumbo-text">#1</span>
                        <p>
                            Crediamo che il <strong>cambiamento climatico</strong> sia una delle sfide più urgenti
                            che l'umanità debba affrontare. Ma sappiamo anche che non possiamo farcela da soli.
                            Abbiamo bisogno del tuo aiuto per sensibilizzare sulla questione e
                            per promuovere comportamenti sostenibili che possano fare la differenza.
                        </p>
                    </div>

                    <div className="section-content-left bg-primary-color text-white">
                        <span className="jumbo-text">#2</span>
                        <p>
                            Noi crediamo che il <strong>volantinaggio</strong> sia un modo efficace per comunicare il
                            nostro messaggio:
                            con una grafica chiara, semplice e un messaggio diretto, possiamo informare e sensibilizzare
                            le persone.
                        </p>
                    </div>

                    <div className="section-content-right bg-secondary-color text-black">
                        <span className="jumbo-text">#3</span>
                        <p>
                            <strong>Il primo impatto conta.</strong>
                        </p>

                        <p>
                            Abbiamo solo pochi secondi per catturare l'attenzione.
                            Sappiamo che le persone non hanno tempo da perdere.
                            Ecco perché utilizziamo immagini potenti e frasi semplici ma significative
                            che possono comunicare il nostro messaggio in modo <strong>chiaro e diretto</strong>.
                        </p>
                    </div>

                </section>

                <section className="bg-white text-black">
                    <div className="section-content">
                        <span className="jumbo-text left-aligned">#4</span>
                        <p>
                            Ci basiamo sul <strong>metodo scientifico</strong>.
                        </p>

                        <p>
                            Siamo convinti che le evidenze scientifiche siano essenziali per comprendere l'entità
                            della crisi climatica.
                            Perchè? Banalmente: <strong>la scienza funziona</strong>. È il metodo migliore che abbiamo
                            per capire i fenomeni e <strong>permette a tutti di verificare le affermazioni</strong>, di
                            trarre conclusioni, di
                            smentirle -
                            senza dietrologie, magie, complotti o opinioni personali.
                        </p>
                    </div>
                </section>

                <section>
                    <div className="section-content">
                        <span className="jumbo-text left-aligned">#5</span>
                        <p>
                            Il nostro messaggio è <strong>accessibile</strong>.
                        </p>

                        <p>
                            Non siamo e non vogliamo sembrare estremisti.
                            Non vogliamo mettere le persone sulla difensiva.
                            Cerchiamo di <strong>parlare a tutti</strong> - indipendentemente dalla loro posizione o
                            ideologia -
                            non solo agli addetti ai lavori e ai già informati.
                            La nostra idea è semplice: mostrare che un <strong>cambiamento graduale</strong> e poco
                            impattante sulla vita di tutti i giorni può essere adottato da tutti,
                            a partire dall'<strong>alimentazione</strong>.
                        </p>

                    </div>
                </section>

                <section className="bg-cta text-white">
                    <div className="section-content">
                        <span className="jumbo-text left-aligned">#6</span>
                        <p>
                            Stampiamo solo su <strong>carta riciclata</strong> e tramite <a
                            href="https://www.helloprint.it/sostenibilita"
                            className="action-button-secondary">servizi</a> che piantano un albero per ogni ordine di
                            stampa.
                            Vogliamo minimizzare l'impatto ambientale della nostra attività.
                        </p>

                        <p>
                            Siamo convinti che qualunque cambiamento debba partire da qualcuno.
                            Altrimenti nulla cambia e tutto resta immobile. <strong>Vogliamo essere quel
                            qualcuno</strong>.
                        </p>

                    </div>
                </section>

            </article>
        </>
    );
}