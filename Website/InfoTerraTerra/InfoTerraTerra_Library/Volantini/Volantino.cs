namespace InfoTerraTerra_Library.Volantini;

public class Volantino
{
    public required int Id { get; init; }
    public required DateTime Date { get; init; }
    public required string Title { get; init; }
    public required string Slug { get; init; }
    public required string Description { get; init; }
    public required string ImageNameFronte { get; init; }
    public required string ImageNameRetro { get; init; }
    public required string PageUrl { get; init; }
    public required string DownloadUrl { get; init; }
    public required string[] HashTags { get; init; }
    public required Paragraph[] Paragraphs { get; init; }
    
    // Campi calcolati
    public string HashTagsString => string.Join(" ", HashTags);
    public string FormattedDate => Date.ToString("dd/MM/yyyy");
}