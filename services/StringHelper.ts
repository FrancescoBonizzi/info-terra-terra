const StringHelper =  {
    isNullOrWhitespace: (value: string | null | undefined): boolean => {

        if (value === null) {
            return true;
        }

        if (!value) {
            return true;
        }

        // Faccio il .toString perché potrebbe essere un numero (va trovato il punto in cui è numero)
        return value.toString().trim().length <= 0;
    },

    capitalizeFirstLetter: (value: string | null | undefined) => {

        if (value === null) {
            return null;
        }

        if (!value) {
            return null;
        }

        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}

export default StringHelper;