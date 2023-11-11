import {Volantino} from "../volantini/Volantino";

export interface TrackingGroupedData {
    idVolantino: number;
    citta?: string;
    via?: string;
    luogo?: string;
    howMany: number;
    volantino: Volantino;
}

