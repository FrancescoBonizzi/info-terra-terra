namespace InfoTerraTerra.Requests;

public class QrOpenRequest
{
    public required int IdVolantino { get; set; }
    public string? Citta { get; set; }
    public string? Via { get; set; }
    public string? Luogo { get; set; }
}