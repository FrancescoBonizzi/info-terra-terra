import Configurations from "../../../data/Configurations";

export default {

    insertEmailAddressAsync: async (emailAddress: string) => {
        const connectionString = Configurations.sqlConnectionString;
        console.log(`Inserting email address ${emailAddress} into database...`);
    },

    getStatisticsAsync: async () => {
        const connectionString = Configurations.sqlConnectionString;
        console.log(`Getting statistics from database...`);
    }
}