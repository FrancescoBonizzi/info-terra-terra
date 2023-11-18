import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import React from "react";

const title = 'Privacy';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.PrivacyPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'L\'informativa sulla privacy di Info Terra Terra in relazione ai dati personali trattati su questo sito e l\'utilizzo dei cookie.'
);


export default function Page() {
    return (
        <article>

            <section>
                <div className="section-content">
                    <h1>{title}</h1>
                    <h2>Informativa ai sensi dell&apos;art. 13 del Regolamento (UE) n. 679/2016 (&quot;GDPR&quot;)</h2>
                </div>
            </section>

            <section>
                <div className="section-content">
                    <p>
                        I Suoi dati personali in nostro possesso verranno trattati,
                        nel pieno rispetto delle norme in vigore,
                        per rispondere alle mail di contatto tramite l’apposito modulo nel footer del sito
                        o in seguito a contatti diretti alla nostra email ({Constants.EmailAddress}).
                    </p>

                    <p>
                        I dati in nostro possesso non saranno utilizzati per inviare proposte commerciali,
                        nè saranno condivisi con terzi.
                        I dati personali raccolti non rientrano nelle categorie particolari
                        di dati personali di cui all’art.9 del GDPR.
                        L’articolo definisce questi dati come “dati personali che rivelino l’origine razziale o etnica,
                        le opinioni politiche,
                        le convinzioni religiose o filosofiche,
                        o l’appartenenza sindacale, nonché trattare dati genetici,
                        dati biometrici intesi a identificare in modo univoco una persona fisica,
                        dati relativi alla salute o alla vita sessuale o all’orientamento sessuale della persona”.
                        In sostanza vengono mantenute solo ed unicamente l’indirizzo email, nome e cognome - qualora forniti.
                    </p>

                </div>
            </section>

            <section className="bg-alt">
                <div className="section-content">
                    <p>
                        I dati verranno trattati finché saranno necessari per le finalità per le quali sono stati raccolti.
                        L’interessato può richiede la modifica/cancellazione dei dati utilizzati
                        in qualsiasi momento scrivendo uno specifico messaggio all’indirizzo email {Constants.EmailAddress}.
                        Qualora il titolare non rispondesse nei tempi o in modo soddisfacente in base
                        a quanto previsto dalla norma, è possibile proporre segnalazione al Garante della privacy
                        secondo le modalità qui indicate: indicazioni del <a className="action-button-secondary" href="https://www.garanteprivacy.it/home/diritti/" title="Il sito del Garante della Privacy">Garante della Privacy</a>.
                    </p>
                </div>
            </section>

            <section>
                <div className="section-content">
                    <h4>ARTICOLO 15 - GDPR - REGOLAMENTO GENERALE SULLA PROTEZIONE DEI DATI (UE/2016/679)</h4>
                    <p>
                        Per sua completa e puntuale conoscenza,
                        le riportiamo di seguito i diritti di accesso degli interessati
                        in base all’articolo 15 del GDPR.
                    </p>

                    <h4>DIRITTO DI ACCESSO DELL’INTERESSATO</h4>
                    <p>
                        L’interessato ha il diritto di ottenere dal titolare del trattamento
                        la conferma che sia o meno in corso un trattamento di dati personali
                        che lo riguardano e in tal caso, di ottenere l’accesso ai dati personali e alle seguenti informazioni:
                    </p>

                    <ul>
                        <li>le finalità del trattamento;</li>
                        <li>le categorie di dati personali in questione;</li>
                        <li>i destinatari o le categorie di destinatari a cui i dati personali sono stati o saranno comunicati, in particolare se destinatari di paesi terzi o organizzazioni internazionali;</li>
                        <li>quando possibile, il periodo di conservazione dei dati personali previsto oppure, se non è possibile, i criteri utilizzati per determinare tale periodo;</li>
                        <li>l’esistenza del diritto dell’interessato di chiedere al titolare del trattamento la rettifica o la cancellazione dei dati personali o la limitazione del trattamento dei dati personali che lo riguardano o di opporsi al loro trattamento;</li>
                        <li>il diritto di proporre reclamo a un’autorità di controllo;</li>
                        <li>qualora i dati non siano raccolti presso l’interessato, tutte le informazioni disponibili sulla loro origine;</li>
                        <li>
                            l’esistenza di un processo decisionale automatizzato,
                            compresa la profilazione di cui all’articolo 22, paragrafi 1 e 4, e, almeno in tali casi, informazioni significative sulla logica utilizzata, nonché l’importanza e le conseguenze previste di tale trattamento per l’interessato.
                        </li>
                    </ul>

                </div>

            </section>

            <section className="bg-alt">
                <div className="section-content">

                    <p>
                        Qualora i dati personali siano trasferiti a un paese terzo o a un’organizzazione internazionale,
                        l’interessato ha il diritto di essere informato dell’esistenza di garanzie adeguate
                        ai sensi dell’articolo 46 relative al trasferimento.
                    </p>
                    <p>
                        Il titolare del trattamento fornisce una copia dei dati personali
                        oggetto di trattamento. In caso di ulteriori copie richieste dall’interessato,
                        il titolare del trattamento può addebitare un contributo spese
                        ragionevole basato sui costi amministrativi.
                        Se l’interessato presenta la richiesta mediante mezzi elettronici,
                        e salvo indicazione diversa dell’interessato,
                        le informazioni sono fornite in un formato elettronico di uso comune.
                    </p>
                    <p>
                        Il diritto di ottenere una copia di cui al paragrafo 3 non deve ledere i diritti
                        e le libertà altrui.
                    </p>

                </div>
            </section>

            <section>
                <div className="section-content">

                    <h4>COOKIE</h4>
                    <p>
                        Questo sito web non utilizza alcun cookie, se non per un&apos;area riservata non accessibile al pubblico.
                    </p>

                    <h4>COS’È UN COOKIE</h4>
                    <p>
                        I cookie sono stringhe di testo di piccole dimensioni che i siti
                        che l’utente visita inviano al suo terminale (di norma il browser),
                        dove vengono registrati per essere poi trasmessi nuovamente agli stessi siti
                        alla successiva visita del medesimo utente. Nel corso della navigazione su un sito,
                        l’utente può ricevere sul suo terminale anche cookie inviati da siti o da web server
                        diversi rispetto al sito che sta visitando (le cosiddette “terze parti”),
                        sui quali possono risiedere alcuni elementi (quali, ad esempio, immagini,
                        mappe, suoni, specifici link a pagine di altri domini) presenti sul sito oggetto
                        di navigazione.
                    </p>

                    <h4>COOKIE TECNICI</h4>
                    <p>
                        I cookie tecnici sono quelli utilizzati,
                        come indicato all’art. 122, comma 1, del Codice Privacy, al solo
                        fine di “effettuare la trasmissione di una comunicazione su una rete
                        di comunicazione elettronica, o nella misura strettamente necessaria al
                        fornitore di un servizio della società dell’informazione esplicitamente
                        richiesto dall’abbonato o dall’utente a erogare tale servizio”.
                        Essi hanno lo scopo di consentire una normale fruizione e navigazione dei siti web.
                        Tra questi sono inclusi anche i cookie che raccolgono dati informa aggregata
                        sull’uso del sito (cosiddetti “analytics”) e cookie di funzionalità inseriti
                        al fine di migliorare l’efficienza del sito e del servizio offerto all’utente
                        (ad es. la selezione della lingua).
                    </p>

                    <h4>COOKIE DI PROFILAZIONE (NON PRESENTI IN QUESTO SITO)</h4>
                    <p>
                        I cookie di profilazione sono utilizzati per creare profili
                        relativi all’utente e vengono utilizzati allo scopo di inviare
                        messaggi pubblicitari in linea con le preferenze mostrate dallo
                        stesso nell’ambito della navigazione in rete.
                    </p>
                    <h4>COME BLOCCARE O LIMITARE I COOKIE</h4>
                    <p>
                        Per bloccare o limitare i cookies, è possibile seguire
                        la procedura prevista dal proprio browser.
                        Di seguito i link alle pagine che illustrano le modalità previste dai browser più popolari:
                    </p>

                    <ul>
                        <li>
                            <a className="action-button-secondary" href="https://support.microsoft.com/kb/278835">Internet Explorer</a>
                        </li>
                        <li>
                            <a className="action-button-secondary" href="https://support.mozilla.org/it/kb/Cancellare%20la%20cronologia%20recente?redirectlocale=en-US&redirectslug=remove-recent-browsing-search-and-download-history">Firefox</a>
                        </li>
                        <li>
                            <a className="action-button-secondary" href="https://support.google.com/chrome/answer/95647?hl=it-IT">Chrome</a>
                        </li>
                        <li>
                            <a className="action-button-secondary" href="https://www.apple.com/legal/privacy/it/cookies/">Safari</a>
                        </li>
                    </ul>

                </div>
            </section>

        </article>
    );
}