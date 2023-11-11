import {SingleVolantinoStatistics} from "./SingleVolantinoStatistics";
import StringHelper from "../../services/StringHelper";
import {TrackingGroupedData} from "./TrackingGroupedData";

export class TrackingQrOpenStatistics {
    singleVolantinoStatistics: SingleVolantinoStatistics[];
    globalCounters: { key: string; value: string }[];

    constructor(trackingGroupedData: TrackingGroupedData[] | null) {
        this.globalCounters = [{ key: "Numero totale QR aperti", value: "Nessuno 😭" }];
        this.singleVolantinoStatistics = [];

        if (!trackingGroupedData || trackingGroupedData.length === 0) return;

        const globalCounters: { key: string; value: string }[] = [];

        globalCounters.push({
            key: "Numero totale QR aperti",
            value: trackingGroupedData.reduce((sum, d) => sum + d.howMany, 0).toString(),
        });

        const qrApertiPerCitta = trackingGroupedData
            .filter((x) => x.citta !== undefined && x.citta !== null)
            .reduce((acc, d) => {
                acc[d.citta!] = acc[d.citta!] || 0;
                acc[d.citta!] += d.howMany;
                return acc;
            }, {} as { [key: string]: number });

        const cittaEntries = Object.entries(qrApertiPerCitta)
            .filter(([citta, count]) => citta && count)
            .sort((a, b) => b[1] - a[1]);

        globalCounters.push(
            ...cittaEntries.map(([c, count]) => ({
                key: `A ${StringHelper.capitalizeFirstLetter(c)}`,
                value: count.toString(),
            }))
        );

        this.globalCounters = globalCounters;

        const singleVolantinoStatistics: SingleVolantinoStatistics[] = [];

        const qrApertiPerVolantino = trackingGroupedData
            .reduce((acc, d) => {
                acc[d.idVolantino] = acc[d.idVolantino] || [];
                acc[d.idVolantino].push(d);
                return acc;
            }, {} as { [key: string]: TrackingGroupedData[] });

        const volantinoEntries = Object.entries(qrApertiPerVolantino)
            .filter(([volantino, data]) => data && data.length > 0)
            .sort((a, b) => Number(b[0]) - Number(a[0]));

        singleVolantinoStatistics.push(
            ...volantinoEntries.map(([volantino, data]) => {
                const counters = [{ key: "Numero QR aperti", value: data.reduce((sum, d) => sum + d.howMany, 0).toString() }];

                const numeroQrApertiPerCitta = data
                    .filter((x) => x.citta !== undefined && x.citta !== null)
                    .reduce((acc, d) => {
                        acc[d.citta!] = acc[d.citta!] || 0;
                        acc[d.citta!] += d.howMany;
                        return acc;
                    }, {} as { [key: string]: number });

                const numeroQrApertiPerLuogo = data
                    .filter((x) => x.luogo !== undefined && x.luogo !== null)
                    .reduce((acc, d) => {
                        acc[d.luogo!] = acc[d.luogo!] || 0;
                        acc[d.luogo!] += d.howMany;
                        return acc;
                    }, {} as { [key: string]: number });

                const numeroQrApertiPerCittaVia = data
                    .filter((x) => x.via && x.citta)
                    .reduce((acc, d) => {
                        const key = `${d.citta} - ${d.via}`;
                        acc[key] = acc[key] || 0;
                        acc[key] += d.howMany;
                        return acc;
                    }, {} as { [key: string]: number });

                return {
                    titoloVolantino: data[0].volantino.title,
                    counters: counters,
                    perCitta: Object.entries(numeroQrApertiPerCitta)
                        .filter(([citta, count]) => citta && count)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([c, count]) => ({ key: StringHelper.capitalizeFirstLetter(c)!, value: count.toString() })),
                    perVia: Object.entries(numeroQrApertiPerCittaVia)
                        .filter(([key, count]) => key && count)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([key, count]) => ({ key: StringHelper.capitalizeFirstLetter(key)!, value: count.toString() })),
                    perLuogo: Object.entries(numeroQrApertiPerLuogo)
                        .filter(([luogo, count]) => luogo && count)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([l, count]) => ({ key: StringHelper.capitalizeFirstLetter(l)!, value: count.toString() })),
                };
            })
        );

        this.singleVolantinoStatistics = singleVolantinoStatistics;
    }
}
