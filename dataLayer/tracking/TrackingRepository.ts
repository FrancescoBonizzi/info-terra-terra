import 'server-only';
import {TrackingQrOpenStatistics} from "./TrackingQrOpenStatistics";
import StringHelper from "../../services/StringHelper";
import {TrackingGroupedData} from "./TrackingGroupedData";
import VolantiniRepository from "../volantini/VolantiniRepository";
import {QrOpen} from "./QrOpen";
import {getStore} from "@netlify/blobs";
import oldDataJson from "./old_data.json";

const parseUrlValue = (what: string | null | undefined): string | null => {
    return what
        ? StringHelper.capitalizeFirstLetter(what
            .replace(/-/g, " ")
            .replace(/_/g, " "))
        : null;
}

const storeName = "tracking";
const qrOpenKey = "qrOpen";

interface PersistedTrackingData {
    idVolantino: number;
    citta?: string | null;
    via?: string | null;
    luogo?: string | null;
    slug?: string | null;
    ip?: string | null;
    os?: string | null;
    referer?: string | null;
    dateUtc: string;
}

const TrackingRepository = {

    migrateFromOldStoreAsync: async () => {

        const construction = getStore(storeName);
        const persistedTrackingData = await construction.get(
            qrOpenKey,
            {type: 'json'}) as PersistedTrackingData[] ?? [];

        if (persistedTrackingData.length > 0) {
            // Già fatto
            return;
        }

        const oldDataJsonParsed = oldDataJson as PersistedTrackingData[];
        await construction.setJSON(qrOpenKey, oldDataJsonParsed);
    },

    insertQrOpenAsync: async (trackingData: QrOpen) => {

        const construction = getStore(storeName);
        const persistedTrackingData = await construction.get(
            qrOpenKey,
            {type: 'json'}) as PersistedTrackingData[] ?? [];

        persistedTrackingData.push({
            idVolantino: trackingData.trackingSlug.idVolantino,
            citta: parseUrlValue(trackingData.trackingSlug.citta),
            via: parseUrlValue(trackingData.trackingSlug.via),
            luogo: parseUrlValue(trackingData.trackingSlug.luogo),
            slug: trackingData.trackingSlug.slug,
            ip: trackingData.ip,
            os: trackingData.os,
            referer: trackingData.referer,
            dateUtc: new Date().toUTCString()
        });
        await construction.setJSON(qrOpenKey, persistedTrackingData);
    },

    getStatisticsAsync: async (): Promise<TrackingQrOpenStatistics> => {

        const construction = getStore(storeName);
        const persistedTrackingData = await construction.get(
            qrOpenKey,
            {type: 'json'}) as PersistedTrackingData[] ?? [];

        const groupedDataRaw = persistedTrackingData
            .reduce((acc, curr) => {
                const groupingKey = `${curr.idVolantino}-${curr.citta}-${curr.via}-${curr.luogo}`;
                if (!acc[groupingKey]) {
                    acc[groupingKey] = {
                        idVolantino: curr.idVolantino,
                        citta: curr.citta,
                        via: curr.via,
                        luogo: curr.luogo,
                        howMany: 0
                    };
                }
                acc[groupingKey].howMany++;
                return acc;
            }, {} as Record<string, TrackingGroupedData>);

        const groupedData = Object.values(groupedDataRaw);
        const sortedGroupedData = groupedData.toSorted((a, b) =>
            b.idVolantino - a.idVolantino);

        if (groupedData.length === 0) {
            return new TrackingQrOpenStatistics(null);
        }

        for (const data of sortedGroupedData) {
            const volantino = VolantiniRepository.getById(data.idVolantino);

            if (volantino) {
                data.volantino = volantino;
            }
        }

        return new TrackingQrOpenStatistics(
            sortedGroupedData.filter((d) => d.volantino !== null)
        );

    }
}

export default TrackingRepository;