import {Metadata} from "next";
import Constants from "../Constants";

export const MetaDataHelper = {
    generateMetadata: (
        title: string,
        description: string,
        ogImage?: string) : Metadata => {

        ogImage = ogImage ?? "info-terra-terra-og.jpg";
        const ogImagePath = `${Constants.SiteUrl}/images/${ogImage}`;

        return {
            title: title,
            description: description,
            metadataBase: new URL(Constants.SiteUrl),
            robots: {
                index: true,
                follow: true,
                nocache: true
            },
            openGraph: {
                siteName: Constants.SiteTitle,
                locale: 'it_IT',
                title: title,
                description: description,
                type: 'website',
                images: [ogImagePath],
                url: Constants.SiteUrl,
            }
        }

    }
}