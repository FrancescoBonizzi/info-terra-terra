import {Volantino} from "../volantini/Volantino";

export interface TrackingGroupedData {
    IdVolantino: number;
    Citta?: string;
    Via?: string;
    Luogo?: string;
    HowMany: number;
    volantino: Volantino;
}

