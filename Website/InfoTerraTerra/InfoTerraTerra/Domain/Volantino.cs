namespace InfoTerraTerra.Domain;

public class Volantino
{
    public required DateTime Date { get; init; }
    public required string Title { get; init; }
    public required string Slug { get; init; }
    public required string Description { get; init; }
    public required string ImageUrl { get; init; }
    public required string PageUrl { get; init; }
    public required string DownloadUrl { get; init; }
    public required string[] HashTags { get; init; }
}