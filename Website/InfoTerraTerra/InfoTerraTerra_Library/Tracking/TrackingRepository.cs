using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.VisualBasic;

namespace InfoTerraTerra_Library.Tracking;

public class TrackingRepository
{
    private readonly string _connectionString;

    public TrackingRepository(IInfrastructureConfigurationProvider infrastructureConfigurationProvider)
    {
        _connectionString = infrastructureConfigurationProvider.MainSqlServerConnectionString;
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
}