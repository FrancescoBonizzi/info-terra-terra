namespace InfoTerraTerra_Library.Volantini;

public class VolantiniRepository
{
    private readonly Volantino[] _volantini = {
        new()
        {
            Id = 1,
            Date = new DateTime(2023, 05, 8),
            Title = "La porzione di Terra abitabile",
            Slug = "porzione-terra-abitabile",
            Description = "Pascoli e coltivazioni per l'alimentazione animale costituiscono il 77% della superficie agricola mondiale",
            ImageNameFronte = "porzione-terra-abitabile-fronte.jpg",
            ImageNameRetro = "porzione-terra-abitabile-retro.jpg",
            PageUrl = "https://www.infoterraterra.it/volantino/porzione-terra-abitabile",
            DownloadUrl = "https://www.infoterraterra.it/pdf/InfoTerraTerra - La porzione di Terra abitabile.pdf",
            HashTags = new[] { "#terra_abitabile", "#allevamenti", "#calorie" }
        }
    };
    
    public Task<Volantino[]> GetAll()
        => Task.FromResult(_volantini);

    public Task<Volantino?> GetVolantino(int idVolantino)
        => Task.FromResult(_volantini.FirstOrDefault(v => v.Id == idVolantino));
    
    public Task<Volantino?> GetVolantino(string slug)
        => Task.FromResult(_volantini.FirstOrDefault(v => v.Slug == slug));
}