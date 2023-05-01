using System.Collections.ObjectModel;
using System.Xml.Linq;
using Dapper;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.Data.SqlClient;

namespace InfoTerraTerra_Library.Users;

public class SqlServerDataEncryptionXmlRepository : IXmlRepository
{
    private readonly string _connectionString;

    public SqlServerDataEncryptionXmlRepository(IInfrastructureConfigurationProvider configurationProvider)
    {
        _connectionString = configurationProvider.MainSqlServerConnectionString;
    }

    public IReadOnlyCollection<XElement> GetAllElements()
    {
        using var connection = new SqlConnection(_connectionString);
        connection.Open();
        var elements = connection.Query<DataProtectionKey>(
            "SELECT * FROM Users.DataProtectionKeys");
        return new ReadOnlyCollection<XElement>(
            elements.Select(k => XElement.Parse(k.XmlData ?? string.Empty)).ToList());
    }

    public void StoreElement(XElement element, string friendlyName)
    {
        var xmlData = element.ToString();
        const string mergeScript = $@"
                DECLARE @UtcNow AS DATETIME2(0) = GETUTCDATE();

                MERGE INTO [Users].[DataProtectionKeys] as T
                USING 
                (
                    VALUES
                    (@friendlyName, @xmlData, @UtcNow)
                )
                AS S 
                (
                    FriendlyName,
                    XmlData,
                    LastUpdateDateUTC
                )
                ON T.FriendlyName = S.FriendlyName
                
                WHEN MATCHED AND T.[XmlData] != S.[XmlData]
                THEN UPDATE SET T.[XmlData] = S.[XmlData], T.[LastUpdateDateUTC] = S.[LastUpdateDateUTC]
                
                WHEN NOT MATCHED BY TARGET
                THEN INSERT ([FriendlyName], [XmlData], LastUpdateDateUTC)
                VALUES (S.[FriendlyName], S.[XmlData], S.[LastUpdateDateUTC]);";

        using var connection = new SqlConnection(_connectionString);
        connection.Open();
        connection.Execute(mergeScript, new { friendlyName, xmlData });
    }
}