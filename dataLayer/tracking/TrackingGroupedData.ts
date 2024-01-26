import {Volantino} from "../volantini/Volantino";

export interface TrackingGroupedData {
    idVolantino: number;
    citta?: string | null;
    via?: string | null;
    luogo?: string | null;
    howMany: number;
    volantino?: Volantino;
}

