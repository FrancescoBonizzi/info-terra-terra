import 'server-only';

import {NewsletterIscrittiStatistics} from "./NewsletterIscrittiStatistics";
import EmailValidator from "../../services/EmailValidator";
import {FrontendException} from "../exceptions/FrontendException";
import { getStore } from "@netlify/blobs";

const storeName = "newsletter";
const subscriptionsKey = "subscriptions";

interface EmailAddresses {
    emailAddress: string;
    dateUtc: string;
}

const NewsletterRepository = {

    insertEmailAddressAsync: async (emailAddress: string) => {

        if (!EmailValidator.isValidEmailAddress(emailAddress))
            throw new FrontendException("Indirizzo email non valido");

        const construction = getStore(storeName);
        const subscriptions = await construction.get(
            subscriptionsKey,
            { type: 'json' }) as EmailAddresses[] ?? [];

        await construction.setJSON("subscriptions", { type: "common", finish: "bright" });

        const emailAddressId = subscriptions.findIndex(x => x.emailAddress === emailAddress);
        const alreadyExists = emailAddressId >= 0;

        if (!alreadyExists)
        {
            subscriptions.push({
                emailAddress,
                dateUtc: new Date().toUTCString()
            });
            await construction.setJSON(subscriptionsKey, subscriptions);
        }

        // NB: non scrivo un messaggio tipo "eri già iscritto"
        // perché non voglio che si possa capire se un indirizzo (di un altro)
        // email è già stato iscritto o meno.
    },

    getStatisticsAsync: async () : Promise<NewsletterIscrittiStatistics> => {

        const construction = getStore(storeName);
        const subscriptions = await construction.get(
            subscriptionsKey,
            { type: 'json' }) as EmailAddresses[] ?? [];

        return new NewsletterIscrittiStatistics(
            subscriptions.map(x => x.emailAddress));
    }
}

export default NewsletterRepository;