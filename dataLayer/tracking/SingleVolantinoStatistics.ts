import {KeyValuePair} from "../../model/KeyValuePair";

export interface SingleVolantinoStatistics {
    titoloVolantino: string;
    counters: KeyValuePair<string, string>[];
    perCitta: KeyValuePair<string, string>[];
    perVia: KeyValuePair<string, string>[];
    perLuogo: KeyValuePair<string, string>[];
}