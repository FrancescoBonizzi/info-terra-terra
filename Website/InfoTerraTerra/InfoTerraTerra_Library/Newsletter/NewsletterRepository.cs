using Dapper;
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
}