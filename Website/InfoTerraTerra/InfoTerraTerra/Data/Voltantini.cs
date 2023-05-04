using InfoTerraTerra.Domain;

namespace InfoTerraTerra.Data;

public static class Voltantini
{
    public static Volantino[] All { get; } = new Volantino[]
    {
        new Volantino()
        {
            Date = new DateTime(2021, 10, 1),
            Title = "Volantino 1",
            Slug = "volantino-1",
            Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            ImageUrl = "https://via.placeholder.com/150",
            PageUrl = "https://www.google.com",
            DownloadUrl = "https://www.google.com",
            HashTags = new []{ "#tag1", "#tag2", "#tag3" }
        },
        new Volantino()
        {
            Date = new DateTime(2021, 10, 2),
            Title = "Volantino 2",
            Slug = "volantino-2",
            Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            ImageUrl = "https://via.placeholder.com/150",
            PageUrl = "https://www.google.com",
            DownloadUrl = "https://www.google.com",
            HashTags = new []{ "#tag1", "#tag2", "#tag3" }
        },
    };  
}