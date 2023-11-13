import {SingleVolantinoStatistics} from "./SingleVolantinoStatistics";
import StringHelper from "../../services/StringHelper";
import {TrackingGroupedData} from "./TrackingGroupedData";
import {KeyValuePair} from "../../model/KeyValuePair";

export class TrackingQrOpenStatistics {
    singleVolantinoStatistics: SingleVolantinoStatistics[];
    globalCounters: { key: string; value: string }[];

    constructor(trackingGroupedData: TrackingGroupedData[] | null) {

        // Counter globali
        const globalCounters: KeyValuePair<string, string>[] = [];

        if (!trackingGroupedData || trackingGroupedData.length === 0) {
            this.globalCounters = globalCounters;
            return;
        }

        globalCounters.push({
            key: "Numero totale QR aperti",
            value: trackingGroupedData.reduce((acc, d) => acc + d.howMany, 0).toString()
        });

        const qrApertiPerCitta = trackingGroupedData
            .reduce((acc, d) => {
                const existing = acc.find(c => c.key === d.citta);
                if (existing) {
                    existing.value += d.howMany;
                }
                else {
                    acc.push({key: d.citta!, value: d.howMany});
                }
                return acc;
            }, [] as KeyValuePair<string, number>[]);

        if (qrApertiPerCitta.length > 0) {
            const sortedQrApertiPerCitta = qrApertiPerCitta
                .filter(c => c.key !== null)
                .sort((a, b) => b.value - a.value);

            globalCounters.push(
                ...sortedQrApertiPerCitta.map(c => ({
                    key: `A ${StringHelper.capitalizeFirstLetter(c.key!)}`,
                    value: c.value.toString()
                }))
            );
        }

        this.globalCounters = globalCounters;
        // Fine counter globali


        // Counter per volantino
        const singleVolantinoStatistics: SingleVolantinoStatistics[] = [];

        const qrApertiPerVolantino = (trackingGroupedData || [])
            .reduce((acc, d) => {
                const existing = acc.find(c => c.idVolantino === d.idVolantino);
                if (existing) {
                    existing.data.push(d);
                }
                else {
                    acc.push({idVolantino: d.idVolantino, data: [d]});
                }
                return acc;
            }, [] as { idVolantino: number, data: TrackingGroupedData[] }[]);

        if (qrApertiPerVolantino.length > 0) {
            singleVolantinoStatistics.push(
                ...qrApertiPerVolantino.map(c => {
                    const counters: KeyValuePair<string, string>[] = [
                        {key: "Numero QR aperti", value: c.data.reduce((acc, x) => acc + x.howMany, 0).toString()}
                    ];

                    const numeroQrApertiPerCitta = c.data
                        .reduce((acc, d) => {
                            const existing = acc.find(x => x.key === d.citta);
                            if (existing) {
                                existing.value += d.howMany;
                            }
                            else {
                                acc.push({key: d.citta!, value: d.howMany});
                            }
                            return acc;
                        }, [] as KeyValuePair<string, number>[])
                        .filter(d => d.key !== null)
                        .map(d => ({key: StringHelper.capitalizeFirstLetter(d.key!)!, value: d.value.toString()}))
                        .sort((a, b) => a.key.localeCompare(b.key));

                    const numeroQrApertiPerLuogo = c.data
                        .reduce((acc, d) => {
                            const existing = acc.find(x => x.key === d.luogo);
                            if (existing) {
                                existing.value += d.howMany;
                            }
                            else {
                                acc.push({key: d.luogo!, value: d.howMany});
                            }
                            return acc;
                        }, [] as KeyValuePair<string, number>[])
                        .filter(d => d.key !== null)
                        .map(d => ({key: StringHelper.capitalizeFirstLetter(d.key!)!, value: d.value.toString()}))
                        .sort((a, b) => a.key.localeCompare(b.key));

                    const numeroQrApertiPerCittaVia = c.data
                        .filter(x => !!(x.via && x.citta))
                        .reduce((acc, d) => {
                            const key = `${d.citta} - ${d.via}`;
                            const existing = acc.find(x => x.key === key);
                            if (existing) {
                                existing.value += d.howMany;
                            }
                            else {
                                acc.push({key: key, value: d.howMany});
                            }
                            return acc;
                        }, [] as KeyValuePair<string, number>[])
                        .map(d => ({key: StringHelper.capitalizeFirstLetter(d.key!)!, value: d.value.toString()}))
                        .sort((a, b) => a.key.localeCompare(b.key));

                    return {
                        titoloVolantino: c.data[0].volantino.title,
                        counters: counters,
                        perCitta: numeroQrApertiPerCitta,
                        perVia: numeroQrApertiPerCittaVia,
                        perLuogo: numeroQrApertiPerLuogo
                    };
                })
            );
        }

        this.singleVolantinoStatistics = singleVolantinoStatistics;
        // Fine counter per volantino
    }
}
