namespace InfoTerraTerra_Library;

public interface IInfrastructureConfigurationProvider
{
    // ConnectionStrings
    string MainSqlServerConnectionString { get; }
}