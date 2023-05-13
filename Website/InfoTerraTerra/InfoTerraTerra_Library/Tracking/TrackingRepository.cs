using Dapper;
using InfoTerraTerra_Library.Extensions;
using InfoTerraTerra_Library.Volantini;
using Microsoft.Data.SqlClient;

namespace InfoTerraTerra_Library.Tracking;

public class TrackingRepository
{
    private readonly string _connectionString;
    private readonly VolantiniRepository _volantiniRepository;

    public TrackingRepository(
        IInfrastructureConfigurationProvider infrastructureConfigurationProvider,
        VolantiniRepository volantiniRepository)
    {
        _connectionString = infrastructureConfigurationProvider.MainSqlServerConnectionString;
        _volantiniRepository = volantiniRepository;
    }
    
    public async Task InsertQrOpenAsync(QrOpen trackingData)
    {
        await using var connection = new SqlConnection(_connectionString);
        await connection.ExecuteAsync(
            @"INSERT INTO Tracking.QrOpen 
                    (Ip, Os, Referer, Slug, IdVolantino, Citta, Via, Luogo, DateUtc)
                VALUES (@Ip, @Os, @Referer, @Slug, @IdVolantino, @Citta, @Via, @Luogo, GETUTCDATE())",
        new
        {
            trackingData.Ip,
            trackingData.Os,
            trackingData.Referer,
            trackingData.TrackingSlug.Slug,
            trackingData.TrackingSlug.IdVolantino,
            Citta = ParseUrlValue(trackingData.TrackingSlug.Citta),
            Via = ParseUrlValue(trackingData.TrackingSlug.Via),
            Luogo = ParseUrlValue(trackingData.TrackingSlug.Luogo)
        });
    }

    private static string? ParseUrlValue(string? what)
        => what
            ?.Replace("-", " ")
            ?.Replace("_", " ")
            ?.CapitalizeFirstLetter();

    public async Task<TrackingQrOpenStatistics> GetStatistics()
    {
        await using var connection = new SqlConnection(_connectionString);
        var groupedData = (await connection.QueryAsync<TrackingGroupedData>(
            @"SELECT IdVolantino, Citta, Via, Luogo, COUNT(*) AS HowMany 
                FROM Tracking.QrOpen
                WHERE IdVolantino IS NOT NULL
                GROUP BY IdVolantino, Citta, Via, Luogo
                ORDER BY IdVolantino DESC"))
            ?.ToArray();

        if (groupedData == null) 
            return new TrackingQrOpenStatistics(null);
        
        foreach (var data in groupedData)
        {
            var volantino = await _volantiniRepository.GetVolantino(data.IdVolantino);
            if (volantino != null)
            {
                data.Volantino = volantino;
            }
        }

        return new TrackingQrOpenStatistics(groupedData
            .Where(d => d.Volantino != null)
            .ToArray());
    }
}