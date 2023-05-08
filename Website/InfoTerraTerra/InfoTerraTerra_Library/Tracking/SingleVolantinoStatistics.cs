namespace InfoTerraTerra_Library.Tracking;

public class SingleVolantinoStatistics
{
    public required string TitoloVolantino { get; init; }
    public required KeyValuePair<string, string>[] Counters { get; init; }
    public required KeyValuePair<string, string>[] PerCitta { get; init; }
    public required KeyValuePair<string, string>[] PerVia { get; init; }
    public required KeyValuePair<string, string>[] PerLuogo { get; init; }
}