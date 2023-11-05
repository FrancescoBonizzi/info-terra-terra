import {Metadata} from "next";
import Constants from "../Constants";

export const MetaDataHelper = {
    generateMetadata: (
        path: string,
        title: string,
        description: string,
        ogImage?: string) : Metadata => {

        ogImage = ogImage ?? "info-terra-terra-og.jpg";
        const ogImagePath = `${Constants.SiteUrl}/images/${ogImage}`;

        return {
            title: title,
            description: description,
            alternates: {
                canonical: new URL(path, Constants.SiteUrl).toString(),
            },
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
            },
            creator: 'Francesco Bonizzi',
            authors: [{
                name: 'Francesco Bonizzi',
                url: 'https://www.fbonizzi.it',
            }],
            applicationName: Constants.SiteTitle,
            icons: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    url: '/favicon/favicon-32x32.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    url: '/favicon/favicon-16x16.png',
                },
                {
                    rel: 'mask-icon',
                    url: '/favicon/safari-pinned-tab.svg',
                    color: '#423b3b',
                },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    url: '/favicon/apple-touch-icon.png',
                },
                {
                    rel: 'manifest',
                    url: '/favicon/site.webmanifest',
                },
                {
                    rel: 'shortcut icon',
                    url: '/favicon/favicon.ico',
                },
            ]
        };

    }
}