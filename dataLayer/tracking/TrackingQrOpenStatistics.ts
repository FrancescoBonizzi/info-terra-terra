import {SingleVolantinoStatistics} from "./SingleVolantinoStatistics";
import StringHelper from "../../services/StringHelper";
import {TrackingGroupedData} from "./TrackingGroupedData";
import {KeyValuePair} from "../../model/KeyValuePair";

export class TrackingQrOpenStatistics {

    singleVolantinoStatistics!: SingleVolantinoStatistics[];
    globalCounters: { key: string; value: string }[];

    constructor(trackingGroupedData: TrackingGroupedData[] | null) {

        // Counter globali
        const globalCounters: KeyValuePair<string, string>[] = [];

        console.log("trackingGroupedData", trackingGroupedData);

        if (!trackingGroupedData || trackingGroupedData.length === 0) {
            this.globalCounters = globalCounters;
            return;
        }

        globalCounters.push({
            key: "Numero totale QR aperti",
            value: trackingGroupedData.reduce((acc, d) => acc + d.HowMany, 0).toString()
        });

        const qrApertiPerCitta = trackingGroupedData
            .reduce((acc, d) => {
                const existing = acc.find(c => c.key === d.Citta);
                if (existing) {
                    existing.value += d.HowMany;
                }
                else {
                    acc.push({key: d.Citta!, value: d.HowMany});
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
                const existing = acc.find(c => c.idVolantino === d.IdVolantino);
                if (existing) {
                    existing.data.push(d);
                }
                else {
                    acc.push({idVolantino: d.IdVolantino, data: [d]});
                }
                return acc;
            }, [] as { idVolantino: number, data: TrackingGroupedData[] }[]);

        if (qrApertiPerVolantino.length > 0) {
            singleVolantinoStatistics.push(
                ...qrApertiPerVolantino.map(c => {
                    const counters: KeyValuePair<string, string>[] = [
                        {key: "Numero QR aperti", value: c.data.reduce((acc, x) => acc + x.HowMany, 0).toString()}
                    ];

                    const numeroQrApertiPerCitta = c.data
                        .reduce((acc, d) => {
                            const existing = acc.find(x => x.key === d.Citta);
                            if (existing) {
                                existing.value += d.HowMany;
                            }
                            else {
                                acc.push({key: d.Citta!, value: d.HowMany});
                            }
                            return acc;
                        }, [] as KeyValuePair<string, number>[])
                        .filter(d => d.key !== null)
                        .map(d => ({key: StringHelper.capitalizeFirstLetter(d.key!)!, value: d.value.toString()}))
                        .sort((a, b) => a.key.localeCompare(b.key));

                    const numeroQrApertiPerLuogo = c.data
                        .reduce((acc, d) => {
                            const existing = acc.find(x => x.key === d.Luogo);
                            if (existing) {
                                existing.value += d.HowMany;
                            }
                            else {
                                acc.push({key: d.Luogo!, value: d.HowMany});
                            }
                            return acc;
                        }, [] as KeyValuePair<string, number>[])
                        .filter(d => d.key !== null)
                        .map(d => ({key: StringHelper.capitalizeFirstLetter(d.key!)!, value: d.value.toString()}))
                        .sort((a, b) => a.key.localeCompare(b.key));

                    const numeroQrApertiPerCittaVia = c.data
                        .filter(x => !!(x.Via && x.Citta))
                        .reduce((acc, d) => {
                            const key = `${d.Citta} - ${d.Via}`;
                            const existing = acc.find(x => x.key === key);
                            if (existing) {
                                existing.value += d.HowMany;
                            }
                            else {
                                acc.push({key: key, value: d.HowMany});
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
