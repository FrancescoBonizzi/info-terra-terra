using Dapper;
using InfoTerraTerra_Library.Extensions;
using Microsoft.Data.SqlClient;

namespace InfoTerraTerra_Library.Newsletter;

public class NewsletterRepository
{
    private readonly string _connectionString;

    public NewsletterRepository(IInfrastructureConfigurationProvider infrastructureConfigurationProvider)
    {
        _connectionString = infrastructureConfigurationProvider.MainSqlServerConnectionString;
    }

    public async Task InsertEmailAddressAsync(string emailAddress)
    {
        if (!EmailValidator.IsValidEmailAddress(emailAddress))
            throw new FrontendException("Indirizzo email non valido");
        
        await using var connection = new SqlConnection(_connectionString);
        var alreadyExists = (await connection.ExecuteScalarAsync<int?>(
            @"SELECT TOP 1 Id 
                  FROM Newsletter.EmailAddresses 
                  WHERE EmailAddress = @EmailAddress",
            new
            {
                EmailAddress = emailAddress
            })) != null;
        if (!alreadyExists)
        {
            await connection.ExecuteAsync(
                @"INSERT INTO Newsletter.EmailAddresses 
                    (EmailAddress, DateUtc)
                VALUES (@EmailAddress, GETUTCDATE())",
                new
                {
                    EmailAddress = emailAddress
                });
        }

        // NB: non scrivo un messaggio tipo "eri già iscritto"
        // perché non voglio che si possa capire se un indirizzo (di un altro)
        // email è già stato iscritto o meno.
    }
    
    public async Task<NewsletterIscrittiStatistics> GetStatistics()
    {
        await using var connection = new SqlConnection(_connectionString);
        
        var allEmail = await connection.QueryAsync<string>(
            @"SELECT EmailAddress
                  FROM Newsletter.EmailAddresses
                  ORDER BY DateUtc DESC");
        
        var lastEmailDate = await connection.QueryFirstOrDefaultAsync<DateTime?>(
            @"SELECT TOP 1 DateUtc
                  FROM Newsletter.EmailAddresses
                  ORDER BY DateUtc DESC");

        return new NewsletterIscrittiStatistics(
            allEmail.ToArray(),
            lastEmailDate?
                .ToItalianTimezoneFromUtc()
                .ToString("dd/MM/yyyy alle HH:mm"));
    }
}