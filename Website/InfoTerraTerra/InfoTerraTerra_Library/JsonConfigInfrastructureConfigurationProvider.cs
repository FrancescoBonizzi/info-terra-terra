using Microsoft.Extensions.Configuration;

namespace InfoTerraTerra_Library;

public class JsonConfigInfrastructureConfigurationProvider : IInfrastructureConfigurationProvider
{
    private readonly IConfiguration _configuration;

    public JsonConfigInfrastructureConfigurationProvider(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // ConnectionStrings
    public string MainSqlServerConnectionString => GetConnectionStringOrThrow("MainSqlServerConnectionString");

    private string GetConnectionStringOrThrow(string key)
    {
        var value = _configuration.GetConnectionString(key);
        if (string.IsNullOrWhiteSpace(value))
            throw new Exception($"Configuration key {key} not set");

        return value;
    }
}