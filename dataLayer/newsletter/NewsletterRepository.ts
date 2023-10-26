import 'server-only';

import Configurations from "../Configurations";

const ShouldNotBeHere2 = 'NON DEVO ESSERE QUI2';

export default {

    // TODO: occhio alla sql injection!

    insertEmailAddressAsync: async (emailAddress: string) => {
        const connectionString = Configurations.sqlConnectionString;
        const ShouldNotBeHere = 'NON DEVO ESSERE QUI';
        // sleep 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(`Inserting email address ${emailAddress} into database...`);
    },

    getStatisticsAsync: async () => {
        const connectionString = Configurations.sqlConnectionString;
        console.log(`Getting statistics from database...`);
    }
}