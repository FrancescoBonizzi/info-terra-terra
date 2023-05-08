using Dapper;
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
            trackingData.TrackingSlug.Citta,
            trackingData.TrackingSlug.Via,
            trackingData.TrackingSlug.Luogo
        });
    }

    public async Task<TrackingQrOpenStatistics> GetStatistics()
    {
        await using var connection = new SqlConnection(_connectionString);
        var groupedData = (await connection.QueryAsync<TrackingGroupedData>(
            @"SELECT IdVolantino, Citta, Via, Luogo, COUNT(*) AS HowMany 
                FROM Tracking.QrOpen
                GROUP BY IdVolantino, Citta, Via, Luogo
                ORDER BY IdVolantino DESC"))
            ?.ToArray();

        if (groupedData != null)
        {
            foreach (var data in groupedData)
            {
                data.Volantino = (await _volantiniRepository.GetVolantino(data.IdVolantino))!;
            }
        }

        return new TrackingQrOpenStatistics(groupedData?.ToArray());
    }
}