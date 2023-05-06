using InfoTerraTerra_Library.Extensions;

namespace InfoTerraTerra_Library.Tracking;

public static class SlugParser
{
    public static TrackingSlug Parse(string slug)
    {
        var things = slug.Split('-');

        int? idVolantino = null;
        if (things.TryGetValue<string?>(0, out var idVolantinoRaw))
        {
            if (int.TryParse(idVolantinoRaw, out var idVolantinoParsed))
                idVolantino = idVolantinoParsed;
        }

        things.TryGetValue(1, out var citta);
        things.TryGetValue(2, out var via);
        things.TryGetValue(3, out var luogo);

        return new TrackingSlug
        {
            IdVolantino = idVolantino,
            Citta = citta,
            Via = via,
            Luogo = luogo,
            Slug = slug
        };
    }
}