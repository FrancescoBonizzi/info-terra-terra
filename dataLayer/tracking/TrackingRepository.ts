import 'server-only';
import {TrackingQrOpenStatistics} from "./TrackingQrOpenStatistics";
import StringHelper from "../../services/StringHelper";
import Configurations from "../Configurations";
import sql from "mssql";
import {TrackingGroupedData} from "./TrackingGroupedData";
import VolantiniRepository from "../volantini/VolantiniRepository";
import {QrOpen} from "./QrOpen";

const parseUrlValue = (what: string | null | undefined): string | null => {
    return what
        ? StringHelper.capitalizeFirstLetter(what
            .replace(/-/g, " ")
            .replace(/_/g, " "))
        : null;
}

const TrackingRepository = {

    // TODO: occhio alla sql injection!

    insertQrOpenAsync: async (trackingData: QrOpen) => {

        const connection = await sql.connect(Configurations.sqlConnectionString);

        try {
            await connection
                .request()
                .input('Ip', sql.NVarChar, trackingData.ip)
                .input('Os', sql.NVarChar, trackingData.os)
                .input('Referer', sql.NVarChar, trackingData.referer)
                .input('Slug', sql.NVarChar, trackingData.trackingSlug.slug)
                .input('IdVolantino', sql.Int, trackingData.trackingSlug.idVolantino)
                .input('Citta', sql.NVarChar, parseUrlValue(trackingData.trackingSlug.citta))
                .input('Via', sql.NVarChar, parseUrlValue(trackingData.trackingSlug.via))
                .input('Luogo', sql.NVarChar, parseUrlValue(trackingData.trackingSlug.luogo))
                .query(`
                INSERT INTO Tracking.QrOpen 
                (Ip, Os, Referer, Slug, IdVolantino, Citta, Via, Luogo, DateUtc)
                VALUES (@Ip, @Os, @Referer, @Slug, @IdVolantino, @Citta, @Via, @Luogo, GETUTCDATE())`);
        }
        finally {
            await connection.close();
        }
    },

    getStatisticsAsync: async (): Promise<TrackingQrOpenStatistics> => {

        const connection = await sql.connect(Configurations.sqlConnectionString);

        try {
            const result = await connection
                .request()
                .query(`
                SELECT idVolantino, citta, via, luogo, COUNT(*) AS howMany 
                FROM Tracking.QrOpen
                WHERE IdVolantino IS NOT NULL
                GROUP BY IdVolantino, Citta, Via, Luogo
                ORDER BY IdVolantino DESC
            `);

            const groupedData: TrackingGroupedData[] = result.recordset;

            if (!groupedData || groupedData.length === 0) {
                return new TrackingQrOpenStatistics(null);
            }

            for (const data of groupedData) {
                const volantino = VolantiniRepository.getById(data.idVolantino);

                if (volantino) {
                    data.volantino = volantino;
                }
            }

            return new TrackingQrOpenStatistics(
                groupedData.filter((d) => d.volantino !== null)
            );
        }
        finally {
            await connection.close();
        }
    }
}

export default TrackingRepository;