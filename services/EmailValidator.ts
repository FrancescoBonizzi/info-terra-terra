export default {
    isValidEmailAddress: (emailAddress: string) => {
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const re = /\S+@\S+\.\S+/;
        return re.test(emailAddress);
    }
}