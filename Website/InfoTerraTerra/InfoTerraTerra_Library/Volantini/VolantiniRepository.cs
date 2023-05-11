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
            Description = @"Pascoli e coltivazioni per l'alimentazione animale costituiscono il 77% della superficie agricola mondiale, 
                EPPURE il bestiame fornisce a noi esseri umani solo il 18% delle calorie e il 37% delle proteine",
            ImageNameFronte = "volantino-porzione-terra-abitabile-fronte.jpg",
            ImageNameRetro = "volantino-porzione-terra-abitabile-retro.jpg",
            PageUrl = "/volantino/porzione-terra-abitabile",
            DownloadUrl = "/pdf/InfoTerraTerra - La porzione di Terra abitabile.pdf",
            HashTags = new[] { "#terra_abitabile", "#allevamenti", "#calorie" },
            Paragraphs = new []
            {
                new Paragraph(
                    Title: "Metà della terra abitabile del mondo è utilizzata per l'agricoltura",
                    Text: @"Per gran parte della storia dell'umanità, la maggior parte della terra del mondo era selvaggia: 
                            foreste, praterie e arbusti dominavano i suoi paesaggi. 
                            Negli ultimi secoli la situazione è cambiata drasticamente: 
                            gli habitat selvaggi sono stati eliminati trasformandoli in terreni agricoli."),
                new Paragraph(@"Se riavvolgiamo il nastro di 1000 anni, 
                            si stima che solo 4 milioni di chilometri quadrati - meno del 4% della superficie mondiale libera dai ghiacci e non brulla - 
                            fossero utilizzati per l'agricoltura."),
                new Paragraph(@"Nella visualizzazione vediamo la ripartizione della superficie terrestre globale oggi. 
                            Il 10% del mondo è coperto da ghiacciai e un altro 19% è costituito da terre sterili - 
                            deserti, saline secche, spiagge, dune di sabbia e rocce esposte. 
                            La metà di tutta la terra abitabile è utilizzata per l'agricoltura."),
                new Paragraph(@"Rimane solo il 37% di foreste, l'11% di arbusti e praterie, l'1% di acqua dolce e il restante 1% - 
                            una quota molto più piccola di quanto si pensi - 
                            di aree urbane edificate, che comprendono città, paesi, villaggi, strade e altre infrastrutture umane."),
                new Paragraph(@"Esiste anche una distribuzione molto diseguale dell'uso del suolo tra bestiame e 
                            colture per il consumo umano. Se combiniamo i pascoli utilizzati per il pascolo con i terreni utilizzati 
                            per la coltivazione di colture per l'alimentazione animale, il bestiame rappresenta il 77% della superficie agricola globale. 
                            Sebbene il bestiame occupi la maggior parte della superficie agricola mondiale, produce solo il 18% delle calorie mondiali 
                            e il 37% delle proteine totali."),
                new Paragraph(@"L'espansione dell'agricoltura è stata uno dei maggiori impatti dell'umanità sull'ambiente. 
                            Ha trasformato gli habitat ed è una delle maggiori pressioni per la biodiversità: 
                            delle 28.000 specie valutate a rischio di estinzione nella Lista Rossa dell'IUCN, 
                            l'agricoltura è indicata come una minaccia per 24.000 di esse.4 Ma sappiamo anche che possiamo ridurre questi impatti 
                            - sia attraverso cambiamenti nella dieta, sostituendo parte della carne con alternative a base vegetale, 
                            sia attraverso i progressi della tecnologia. 
                            Negli ultimi decenni i raccolti sono aumentati in modo significativo, 
                            il che significa che abbiamo risparmiato molta terra dalla produzione agricola: a livello globale, 
                            per produrre la stessa quantità di colture del 1961, abbiamo bisogno solo del 30% dei terreni agricoli."),
                new Paragraph(@"Con soluzioni da parte di consumatori e produttori, abbiamo 
                                l'importante opportunità di restituire parte di questi terreni agricoli alle foreste e agli habitat naturali.")
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