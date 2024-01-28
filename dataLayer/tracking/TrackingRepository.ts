import 'server-only';
import {TrackingQrOpenStatistics} from "./TrackingQrOpenStatistics";
import StringHelper from "../../services/StringHelper";
import Configurations from "../Configurations";
import {TrackingGroupedData} from "./TrackingGroupedData";
import VolantiniRepository from "../volantini/VolantiniRepository";
import {QrOpen} from "./QrOpen";
import {Client} from "pg";

const parseUrlValue = (what: string | null | undefined): string | null => {
    return what
        ? StringHelper.capitalizeFirstLetter(what
            .replace(/-/g, " ")
            .replace(/_/g, " "))
        : null;
}

const TrackingRepository = {

    insertQrOpenAsync: async (trackingData: QrOpen) => {

        const client = new Client(Configurations.postgresConfiguration);
        await client.connect();

        try {
            await client
                .query(`
            INSERT INTO "Tracking"."QrOpen"
            ("Ip", "Os", "Referer", "Slug", "IdVolantino", "Citta", "Via", "Luogo", "DateUtc")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
                    [
                        trackingData.ip,
                        trackingData.os,
                        trackingData.referer,
                        trackingData.trackingSlug.slug,
                        trackingData.trackingSlug.idVolantino,
                        parseUrlValue(trackingData.trackingSlug.citta),
                        parseUrlValue(trackingData.trackingSlug.via),
                        parseUrlValue(trackingData.trackingSlug.luogo)
                    ]);
        }
        finally {
            await client.end();
        }
    },

    getStatisticsAsync: async (): Promise<TrackingQrOpenStatistics> => {

        const client = new Client(Configurations.postgresConfiguration);
        await client.connect();

        try {
            const result = await client
                .query(`
            SELECT "IdVolantino", "Citta", "Via", "Luogo", COUNT(*)::int AS "HowMany"
            FROM "Tracking"."QrOpen"
            WHERE "IdVolantino" IS NOT NULL
            GROUP BY "IdVolantino", "Citta", "Via", "Luogo"
            ORDER BY "IdVolantino" DESC
        `);

            const groupedData: TrackingGroupedData[] = result.rows;

            if (!groupedData || groupedData.length === 0) {
                return new TrackingQrOpenStatistics(null);
            }

            for (const data of groupedData) {
                const volantino = VolantiniRepository.getById(data.IdVolantino);

                if (volantino) {
                    data.volantino = volantino;
                }
            }

            return new TrackingQrOpenStatistics(
                groupedData.filter((d) => d.volantino !== null)
            );
        }
        finally {
            await client.end();
        }
    }
}

export default TrackingRepository;