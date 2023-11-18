import { MetadataRoute } from 'next'
import Constants from "../Constants";
import VolantiniRepository from "../dataLayer/volantini/VolantiniRepository";

export default function sitemap(): MetadataRoute.Sitemap {

    const slugs = [
        Constants.HomePageSlug,
        Constants.PrivacyPageSlug,
        Constants.AiutaciPageSlug,
        Constants.ManifestoPageSlug,
        Constants.VolantiniPageSlug,
        Constants.NewsletterPageSlug,
        Constants.QrPageSlug
    ]

    const absoluteLinks = slugs.map(s => `${Constants.SiteUrl}${s}`);

    const volantini = VolantiniRepository.getAll();
    volantini.forEach(v => {
        absoluteLinks.push(`${Constants.SiteUrl}${Constants.VolantiniPageSlug}/${v.slug}`)
    })

    return absoluteLinks.map(url => {
        return {
            url,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1
        }
    });
}