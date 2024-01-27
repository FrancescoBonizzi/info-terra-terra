import 'server-only';

import Configurations from "../Configurations";
import {NewsletterIscrittiStatistics} from "./NewsletterIscrittiStatistics";
import sql from "mssql";
import EmailValidator from "../../services/EmailValidator";
import {FrontendException} from "../exceptions/FrontendException";

const NewsletterRepository = {

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
        const alreadyExists = emailAddressId.recordset.length > 0
            && emailAddressId.recordset[0] !== null;

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
            const allEmail = (await connection
                .query(
                    `SELECT emailAddress 
                FROM Newsletter.EmailAddresses 
                ORDER BY DateUtc DESC`)).recordset as {emailAddress: string}[];

            return new NewsletterIscrittiStatistics(
                allEmail.map(x => x.emailAddress));
        }
        finally {
            await connection.close();
        }
    }
}

export default NewsletterRepository;