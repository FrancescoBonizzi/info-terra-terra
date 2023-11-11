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

const title = 'Admin';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.AdminPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Area riservata agli amministratori del sito.'
);

export default async function Page() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return redirect(Constants.LoginPageSlug);
    }

    const trackingQrStatistics = await TrackingRepository.getStatisticsAsync();
    const newsletterStatistics = await NewsletterRepository.getStatisticsAsync();

    return (
        <article>

            <section className="bg-admin">
                <div className="text-align-center">
                    <span>{title}</span>
                    <span>/</span>
                    <span>👋🏻 {session.user.name}</span>
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
                        Statistiche volantino "{volantino.titoloVolantino}"
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