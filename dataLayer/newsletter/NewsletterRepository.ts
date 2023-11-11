import 'server-only';

import Configurations from "../Configurations";

export default {

    // TODO: occhio alla sql injection!

    insertEmailAddressAsync: async (emailAddress: string) => {
        const connectionString = Configurations.sqlConnectionString;
        // sleep 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(`Inserting email address ${emailAddress} into database...`);
    },

    getStatisticsAsync: async () : Promise<NewsletterIscrittiStatistics> => {
        const connectionString = Configurations.sqlConnectionString;
        console.log(`Getting statistics from database...`);
    }
}