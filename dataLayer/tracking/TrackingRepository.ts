import 'server-only';
import {TrackingQrOpenStatistics} from "./TrackingQrOpenStatistics";
import StringHelper from "../../services/StringHelper";

const parseUrlValue = (what: string | null | undefined): string | null =>  {
    return what
        ? StringHelper.capitalizeFirstLetter(what
            .replace(/-/g, " ")
            .replace(/_/g, " "))
        : null;
}

export default {

    // TODO: occhio alla sql injection!

    insertQrOpenAsync: async () => {

    },

    getStatisticsAsync: async () : Promise<TrackingQrOpenStatistics> => {

    }
}