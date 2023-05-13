using System.Text;

namespace InfoTerraTerra.AspNetCore;

public static class SitemapXmlBuilder
{
    private static readonly string[] UrlsetAttributes = {
        "xmlns:xsi=\"https://www.w3.org/2001/XMLSchema-instance\"",
        "xmlns=\"https://www.sitemaps.org/schemas/sitemap/0.9\"",
        "xsi:schemaLocation=\"https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\""
    };
    
    public static string Build(IEnumerable<string> absoluteUrls)
    {
        var rawSitemap = new StringBuilder();
        rawSitemap.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        rawSitemap.AppendLine($"<urlset {string.Join(" ", UrlsetAttributes)}>");
        
        foreach (var url in absoluteUrls)
        {
            rawSitemap.AppendLine("<url>");
            rawSitemap.AppendLine($"<loc>{url}</loc>");
            rawSitemap.AppendLine("</url>");
        }
        
        rawSitemap.AppendLine("</urlset>");
        return rawSitemap.ToString();
    }
}