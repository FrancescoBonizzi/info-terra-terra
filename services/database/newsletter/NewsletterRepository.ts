import Configurations from "../../../data/Configurations";

const ShouldNotBeHere2 = 'NON DEVO ESSERE QUI2';

export default {

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