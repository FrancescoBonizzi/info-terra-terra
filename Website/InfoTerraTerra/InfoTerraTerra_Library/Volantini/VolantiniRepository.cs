namespace InfoTerraTerra_Library.Volantini;

public class VolantiniRepository
{
    // TODO: ma fare file .md con questi valori e pescarli da disco trasformati in HTML?
    // https://github.com/xoofx/markdig
    
    private readonly Volantino[] _volantini = {
        new()
        {
            Id = 1,
            Date = new DateTime(2023, 05, 8),
            Title = "La porzione di Terra abitabile",
            Slug = "porzione-terra-abitabile",
            Description = @"La popolazione mondiale è più che raddoppiata negli ultimi 50 anni: 
                a causa delle limitate risorse territoriali 
                e dell'ampio impatto ambientale delle nostre scelte alimentari
                è necessario iniziare a nutrirsi con consapevolezza.",
            ImageNameFronte = "volantino-1/volantino-porzione-terra-abitabile-fronte.jpg",
            ImageNameRetro = "volantino-1/volantino-porzione-terra-abitabile-retro.jpg",
            OgImage = "volantino-1/volantino-info-terra-terra-og.jpg",
            PageUrl = "/volantino/porzione-terra-abitabile",
            DownloadUrl = "/pdf/InfoTerraTerra - La porzione di Terra abitabile.pdf",
            HashTags = new[] { "#terra_abitabile", "#allevamenti", "#calorie" },
            Fonti = new[]
                {
                    "https://ourworldindata.org/land-use"
                },
            Paragraphs = new []
            {
                new Paragraph(
                    Title: "Metà della terra abitabile del mondo è utilizzata per l'agricoltura",
                    Text: @"Per gran parte della storia dell'umanità, la maggior parte della terra del mondo era selvaggia: 
                            foreste, praterie e arbusti dominavano i suoi paesaggi. 
                            Negli ultimi secoli la situazione è cambiata drasticamente: 
                            <strong>gli habitat selvaggi sono stati eliminati</strong> trasformandoli in terreni agricoli."),
                new Paragraph(
                    ImageRelativePath: "volantino-1/volantino-info-terra-terra-solo-grafico.png",
                    ImageAltText: "Grafico che mostra la ripartizione della superficie terrestre globale oggi"),
                new Paragraph(
                    Title: "La terra agricola è utilizzata principalmente per il bestiame",
                    Text: @"Esiste anche una distribuzione molto <strong>diseguale</strong> dell'uso del suolo tra bestiame e 
                            colture per il consumo umano. Se combiniamo i pascoli utilizzati per il pascolo con i terreni utilizzati 
                            per la coltivazione di colture per l'alimentazione animale, <strong>il bestiame rappresenta il 77% della superficie agricola</strong> globale. 
                            Sebbene il bestiame occupi la maggior parte della superficie agricola mondiale, produce solo il <strong>18% delle calorie</strong> mondiali 
                            e <strong>il 37% delle proteine</strong> totali."),
                new Paragraph(
                    ImageRelativePath: "/volantino-1/volantino-info-terra-terra-solo-spreco-risorse.jpg",
                    ImageAltText: "Disegno che mostra un toro che piange"),
                new Paragraph(
                    Text: @"L'espansione dell'agricoltura è stata <strong>uno dei maggiori impatti dell'umanità sull'ambiente</strong>. 
                            Ha trasformato gli habitat ed è una delle maggiori pressioni per la <strong>biodiversità</strong>: 
                            delle 28.000 specie valutate a rischio di estinzione nella Lista Rossa dell'
                            <a class='action-button-secondary' href='https://www.iucn.org/'>IUCN</a>, 
                            l'agricoltura è indicata come una minaccia per 24.000 di esse."),
                new Paragraph(
                    Title: "Ridurre il consumo di carne e derivati",
                    Text: @"È la <strong>singola azione individuale più efficace</strong> che possiamo compiere nel quotidiano 
                            per migliorare la nostra impronta ecologica 
                            e contrastare i cambiamenti climatici.
                            <strong>Non serve stravolgere la tua vita</strong>, 
                            con una singola azione chiave, puoi veramente fare la differenza!"),
            }
        }
    };
    
    public Task<Volantino[]> GetAll()
        => Task.FromResult(_volantini);

    public Task<Volantino?> GetVolantino(int idVolantino)
        => Task.FromResult(_volantini.FirstOrDefault(v => v.Id == idVolantino));
    
    public Task<Volantino?> GetVolantino(string slug)
        => Task.FromResult(_volantini.FirstOrDefault(v => v.Slug == slug));
}