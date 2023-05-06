using InfoTerraTerra.Domain;

namespace InfoTerraTerra.Data;

public static class Voltantini
{
    public static Volantino[] All { get; } = new Volantino[]
    {
        new Volantino()
        {
            Id = 1,
            Date = new DateTime(2021, 10, 1),
            Title = "Volantino 1",
            Slug = "volantino-1",
            Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            ImageName = "volantino-1.png",
            PageUrl = "https://www.google.com",
            DownloadUrl = "https://www.google.com",
            HashTags = new []{ "#tag1", "#tag2", "#tag3" }
        },
        new Volantino()
        {
            Id = 2,
            Date = new DateTime(2021, 10, 2),
            Title = "Volantino 2",
            Slug = "volantino-2",
            Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            ImageName = "volantino-1.png",
            PageUrl = "https://www.google.com",
            DownloadUrl = "https://www.google.com",
            HashTags = new []{ "#tag1", "#tag2", "#tag3" }
        },
    };  
}