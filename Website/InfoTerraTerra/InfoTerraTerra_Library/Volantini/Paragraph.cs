namespace InfoTerraTerra_Library.Volantini;

public record Paragraph(
    string? Text = null, 
    string? Title = null,
    string? ImageRelativePath = null,
    string? ImageAltText = null);