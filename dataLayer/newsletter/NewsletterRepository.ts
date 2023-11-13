import 'server-only';

import Configurations from "../Configurations";
import {NewsletterIscrittiStatistics} from "./NewsletterIscrittiStatistics";
import sql from "mssql";
import EmailValidator from "../../services/EmailValidator";
import {FrontendException} from "../exceptions/FrontendException";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {

    insertEmailAddressAsync: async (emailAddress: string) => {

        if (!EmailValidator.isValidEmailAddress(emailAddress))
            throw new FrontendException("Indirizzo email non valido");

        const connection = await sql.connect(Configurations.sqlConnectionString);
        const emailAddressId = await connection
            .request()
            .input("emailAddress", sql.VarChar, emailAddress)
            .query<number | null>(
                'SELECT TOP 1 id ' +
                'FROM Newsletter.EmailAddresses ' +
                'WHERE EmailAddress = @emailAddress');
        const alreadyExists = emailAddressId != null;

        if (!alreadyExists)
        {
            await connection
                .request()
                .input("emailAddress", sql.VarChar, emailAddress)
                .query(
                    `INSERT INTO Newsletter.EmailAddresses (EmailAddress, DateUtc)
                    VALUES (@emailAddress, GETUTCDATE())`);
        }

        // NB: non scrivo un messaggio tipo "eri già iscritto"
        // perché non voglio che si possa capire se un indirizzo (di un altro)
        // email è già stato iscritto o meno.
    },

    getStatisticsAsync: async () : Promise<NewsletterIscrittiStatistics> => {

        const connection = await sql.connect(Configurations.sqlConnectionString);

        try {
            const allEmail = await connection
                .query<string[]>(
                    `SELECT emailAddress 
                FROM Newsletter.EmailAddresses 
                ORDER BY DateUtc DESC`);

            const lastEmailDateRaw = await connection
                .query<string | null>(
                    `SELECT TOP 1 dateUtc 
                FROM Newsletter.EmailAddresses
                ORDER BY DateUtc DESC`);

            let lastEmailDateItalianTimeZoneString = null;

            if (lastEmailDateRaw.recordset.length > 0) {
                const lastEmailUtc = dayjs.utc(lastEmailDateRaw.recordset[0]);
                const lastEmailDateItalianTimeZone = lastEmailUtc.tz('Europe/Rome');
                lastEmailDateItalianTimeZoneString = lastEmailDateItalianTimeZone.format("DD/MM/YYYY [alle] HH:mm");
            }

            return new NewsletterIscrittiStatistics(
                allEmail.recordset,
                lastEmailDateItalianTimeZoneString);
        }
        finally {
            await connection.close();
        }
    }
}