using InfoTerraTerra_Library.Extensions;

namespace InfoTerraTerra_Library.Tracking;

public class TrackingQrOpenStatistics
{
    public SingleVolantinoStatistics[] SingleVolantinoStatistics { get; }
    public KeyValuePair<string, string>[] GlobalCounters { get; }

    public TrackingQrOpenStatistics(
        IReadOnlyCollection<TrackingGroupedData>? trackingGroupedData)
    {
        GlobalCounters = new KeyValuePair<string, string>[]
        {
            new("Numero totale QR aperti", "Nessuno 😭")
        };

        SingleVolantinoStatistics = Array.Empty<SingleVolantinoStatistics>();
            
        var globalCounters = new List<KeyValuePair<string, string>>();
        if (trackingGroupedData == null || !trackingGroupedData.Any()) return;
        
        {
            globalCounters.Add(new KeyValuePair<string, string>(
                "Numero totale QR aperti", trackingGroupedData.Sum(d => d.HowMany).ToString()));
            var qrApertiPerCitta = trackingGroupedData
                .GroupBy(d => d.Citta)
                .ToArray();
            if (qrApertiPerCitta.Any())
            {
                globalCounters.AddRange(qrApertiPerCitta
                    .Where(c => c.Key != null)
                    .OrderByDescending(c => c.Count())
                    .Select(c => new KeyValuePair<string, string>(
                        $"A {c.Key!.CapitalizeFirstLetter()}",
                        c.Sum(d => d.HowMany).ToString())));
            }

            GlobalCounters = globalCounters.ToArray();
        }

        {
            var singleVolantinoStatistics = new List<SingleVolantinoStatistics>();
            var qrApertiPerVolantino = trackingGroupedData
                .GroupBy(d => d.IdVolantino)
                .Where(d => d.Any())
                .ToArray();
            if (qrApertiPerVolantino.Any())
            {
                singleVolantinoStatistics.AddRange(qrApertiPerVolantino
                    .OrderByDescending(c => c.Key)
                    .Select(c =>
                    {
                        var counters = new KeyValuePair<string, string>[]
                        {
                            new(
                                "Numero QR aperti",
                                c.Sum(d => d.HowMany).ToString())
                        };
                            
                        var numeroQrApertiPerCitta = c
                            .GroupBy(d => d.Citta)
                            .Where(d => d.Key != null)
                            .Select(d => new KeyValuePair<string, string>(
                                d.Key!.CapitalizeFirstLetter(),
                                d.Sum(x => x.HowMany).ToString()))
                            .OrderBy(x => x.Key)
                            .ToArray();

                        var numeroQrApertiPerLuogo = c
                            .GroupBy(d => d.Luogo)
                            .Where(d => d.Key != null)
                            .Select(d => new KeyValuePair<string, string>(
                                d.Key!.CapitalizeFirstLetter(),
                                d.Sum(x => x.HowMany).ToString()))
                            .OrderBy(x => x.Key)
                            .ToArray();
                            
                        var numeroQrApertiPerCittaVia = c
                            .Where(x => !string.IsNullOrWhiteSpace(x.Via) && !string.IsNullOrWhiteSpace(x.Citta))
                            .GroupBy(d => $"{d.Citta} - {d.Via}")
                            .Select(d => new KeyValuePair<string, string>(
                                d.Key.CapitalizeFirstLetter(),
                                d.Sum(x => x.HowMany).ToString()))
                            .OrderBy(x => x.Key)
                            .ToArray();
                            
                        return new SingleVolantinoStatistics
                        {
                            TitoloVolantino = c.First().Volantino.Title,
                            Counters = counters,
                            PerCitta = numeroQrApertiPerCitta,
                            PerVia = numeroQrApertiPerCittaVia,
                            PerLuogo = numeroQrApertiPerLuogo
                        };
                    }));
            }
                
            SingleVolantinoStatistics = singleVolantinoStatistics.ToArray();
        }
    }
}