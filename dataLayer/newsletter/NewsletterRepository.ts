import 'server-only';

import {Client} from 'pg';
import Configurations from "../Configurations";
import {NewsletterIscrittiStatistics} from "./NewsletterIscrittiStatistics";
import EmailValidator from "../../services/EmailValidator";
import {FrontendException} from "../exceptions/FrontendException";

const NewsletterRepository = {

    insertEmailAddressAsync: async (emailAddress: string) => {

        if (!EmailValidator.isValidEmailAddress(emailAddress)) {
            throw new FrontendException("Indirizzo email non valido");
        }

        const client = new Client(Configurations.postgresConfiguration);
        await client.connect();

        try {
            const result = await client.query(
                'SELECT id FROM Newsletter.EmailAddresses WHERE EmailAddress = $1 LIMIT 1',
                [emailAddress]
            );

            const alreadyExists = result.rows.length > 0;

            if (!alreadyExists) {
                await client.query(
                    `INSERT INTO Newsletter.EmailAddresses (EmailAddress, DateUtc)
                VALUES ($1, NOW())`,
                    [emailAddress]
                );
            }
        }
        finally {
            await client.end();
        }

        // NB: non scrivo un messaggio tipo "eri già iscritto"
        // perché non voglio che si possa capire se un indirizzo (di un altro)
        // email è già stato iscritto o meno.
    },

    getStatisticsAsync: async (): Promise<NewsletterIscrittiStatistics> => {

        const client = new Client(Configurations.postgresConfiguration);
        await client.connect();

        try {
            const {rows} = await client.query(
                `SELECT emailAddress
            FROM Newsletter.EmailAddresses
            ORDER BY DateUtc DESC`);

            return new NewsletterIscrittiStatistics(rows.map(x => x.emailAddress));
        }
        finally {
            await client.end();
        }
    }
}

export default NewsletterRepository;