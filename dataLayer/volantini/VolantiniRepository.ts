import {Volantino} from "./Volantino";


const _volantini : Volantino[] = [
   {
      id: 1,
      date: new Date(2023, 4, 8), // Mese è 0-based (0 = Gennaio, 4 = Maggio)
      formattedDate: "08/05/2023",
      title: "La porzione di Terra abitabile",
      slug: "porzione-terra-abitabile",
      description: `La popolazione mondiale è più che raddoppiata negli ultimi 50 anni: 
            a causa delle limitate risorse territoriali 
            e dell'ampio impatto ambientale delle nostre scelte alimentari
            è necessario iniziare a nutrirsi con consapevolezza.`,
      imageNameFronte: "volantino-1/volantino-porzione-terra-abitabile-fronte.jpg",
      imageNameRetro: "volantino-1/volantino-porzione-terra-abitabile-retro.jpg",
      ogImage: "volantino-1/volantino-info-terra-terra-og.jpg",
      pageUrl: "/volantini/porzione-terra-abitabile",
      downloadUrl: "/pdf/InfoTerraTerra - La porzione di Terra abitabile.pdf",
      hashTags: ["#terra_abitabile", "#allevamenti", "#calorie"],
      fonti: ["https://ourworldindata.org/land-use"],
      paragraphs: [
         {
            id: 1,
            title: "Metà della terra abitabile del mondo è utilizzata per l'agricoltura",
            text: `Per gran parte della storia dell'umanità, la maggior parte della terra del mondo era selvaggia: 
                        foreste, praterie e arbusti dominavano i suoi paesaggi. 
                        Negli ultimi secoli la situazione è cambiata drasticamente: 
                        <strong>gli habitat selvaggi sono stati eliminati</strong> trasformandoli in terreni agricoli.`,
         },
         {
            id: 2,
            imageRelativePath: "volantino-1/volantino-info-terra-terra-solo-grafico.png",
            imageAltText: "Grafico che mostra la ripartizione della superficie terrestre globale oggi",
         },
         {
            id: 3,
            title: "La terra agricola è utilizzata principalmente per il bestiame",
            text: `Esiste anche una distribuzione molto <strong>diseguale</strong> dell'uso del suolo tra bestiame e 
                        colture per il consumo umano. Se combiniamo i pascoli utilizzati per il pascolo con i terreni utilizzati 
                        per la coltivazione di colture per l'alimentazione animale, <strong>il bestiame rappresenta il 77% della superficie agricola</strong>. 
                        Sebbene il bestiame occupi la maggior parte della superficie agricola mondiale, produce solo il <strong>18% delle calorie</strong> mondiali 
                        e <strong>il 37% delle proteine</strong> totali.`,
         },
         {
            id: 4,
            imageRelativePath: "/volantino-1/volantino-info-terra-terra-solo-spreco-risorse.jpg",
            imageAltText: "Disegno che mostra un toro che piange",
         },
         {
            id: 5,
            text: `L'espansione dell'agricoltura è stata <strong>uno dei maggiori impatti dell'umanità sull'ambiente</strong>. 
                        Ha trasformato gli habitat ed è una delle maggiori pressioni per la <strong>biodiversità</strong>: 
                        delle 28.000 specie valutate a rischio di estinzione nella Lista Rossa dell'
                        <a class='action-button-secondary' href='https://www.iucn.org/'>IUCN</a>, 
                        l'agricoltura è indicata come una minaccia per 24.000 di esse.`,
         },
         {
            id: 6,
            title: "Ridurre il consumo di carne e derivati",
            text: `È la <strong>singola azione individuale più efficace</strong> che possiamo compiere nel quotidiano 
                        per migliorare la nostra impronta ecologica 
                        e contrastare i cambiamenti climatici.
                        <strong>Non serve stravolgere la tua vita</strong>, 
                        con una singola azione chiave, puoi veramente fare la differenza!`,
         },
      ],
   },
];

export default {

   getAll: () => _volantini,
   getById: (id: number) => _volantini.find((v) => v.id === id),
   getBySlug: (slug: string) => _volantini.find((v) => v.slug === slug),

}
