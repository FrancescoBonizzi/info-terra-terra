import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import {getServerSession} from "next-auth";
import {authConfig} from "../../services/AuthConfig";
import {redirect} from "next/navigation";
import TrackingRepository from "../../dataLayer/tracking/TrackingRepository";
import NewsletterRepository from "../../dataLayer/newsletter/NewsletterRepository";
import {Counter} from "../../components/admin/Counter";
import {CounterWithCategory} from "../../components/admin/CounterWithCategory";
import {KeyValuePair} from "../../model/KeyValuePair";
import React from "react";

const title = 'Amministrazione';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.AdminPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Area riservata agli amministratori del sito.'
);

const generateErrorPage = (
    error: unknown,
    callerName: string) => {

    const errorMessage = error instanceof Error
        ? error.message
        : JSON.stringify(error);

    return (
        <article>
            <section className="bg-admin">
                <div className="text-align-center">
                    <span>Errore!</span>
                </div>
            </section>
            <p>{callerName}</p>
            <p>{errorMessage}</p>
        </article>
    );
}

export default async function Page() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return redirect(Constants.LoginPageSlug);
    }

    let trackingQrStatistics = null;
    let newsletterStatistics = null;

    try {
        await TrackingRepository.migrateFromOldStoreAsync();
    }
    catch (error) {
        return generateErrorPage(error, 'TrackingRepository.migrateFromOldStoreAsync');
    }

    try {
        trackingQrStatistics = await TrackingRepository.getStatisticsAsync();
    }
    catch (error) {
        return generateErrorPage(error, 'TrackingRepository.getStatisticsAsync');
    }

    try {
        newsletterStatistics = await NewsletterRepository.getStatisticsAsync();
    }
    catch (error) {
        return generateErrorPage(error, 'NewsletterRepository.getStatisticsAsync');
    }

    const pageTitleSpan = `${title} / 👋🏻 ${session.user.name}`;

    return (
        <article>

            <section className="bg-admin">
                <div className="text-align-center">
                    <span>{pageTitleSpan}</span>
                </div>
            </section>

            <div className="admin-counters-container">

                {newsletterStatistics.counters.map((counter: KeyValuePair<string, string>) => (
                    <Counter
                        key={counter.key}
                        counter={counter}/>
                ))}

                {newsletterStatistics.allNewsletterEmail.length > 0 &&
                    <div className="counter-container">
                        <div className="counter-label">
                            Indirizzi email iscritti alla newsletter
                        </div>

                        <div className="newsletter-email-container">
                            <ol>
                                {newsletterStatistics.allNewsletterEmail.map((email: string) => (
                                    <li key={email}>{email}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                }

                {trackingQrStatistics.globalCounters.map(counter => (
                    <Counter counter={counter} key={counter.key}/>
                ))}

                {trackingQrStatistics.singleVolantinoStatistics.map(volantino => (
                    <div className="volantino-stat-container" key={volantino.titoloVolantino}>

                    <span className="stat-titolo-volantino">
                        Statistiche volantino &quot;{volantino.titoloVolantino}&quot;
                    </span>

                        <div className="volantino-counters-container">

                            {volantino.counters.map(counter => (
                                <Counter
                                    key={counter.key}
                                    counter={counter}/>
                            ))}

                            <CounterWithCategory
                                title={'Per città'}
                                subCounters={volantino.perCitta}/>

                            <CounterWithCategory
                                title={'Per via'}
                                subCounters={volantino.perVia}/>

                            <CounterWithCategory
                                title={'Per luogo'}
                                subCounters={volantino.perLuogo}/>

                        </div>
                    </div>
                ))}

            </div>

        </article>
    )
}