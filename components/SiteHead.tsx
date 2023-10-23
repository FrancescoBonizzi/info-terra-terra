'use client'

import Constants from "../Constants";
import { usePathname } from 'next/navigation'
import Head from "next/head";

export const SiteHead = () => {

    const pathName = usePathname();
    const canonicalUrl = `${Constants.SiteUrl}/${pathName}`;

    return (
        <Head>

            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            <link rel="canonical" href={canonicalUrl}/>

            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
                  rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Secular+One&display=swap" rel="stylesheet"/>

            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
            <link rel="manifest" href="/favicon/site.webmanifest"/>
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#423b3b"/>
            <link rel="shortcut icon" href="/favicon/favicon.ico"/>
            <meta name="msapplication-TileColor" content="#423b3b"/>
            <meta name="msapplication-config"
                  content="/favicon/browserconfig.xml"/>
            <meta name="theme-color" content="#423b3b"/>

            <link rel="stylesheet" href="/css/site.css"/>
            <link rel="stylesheet" href="/css/responsive.css"/>

        </Head>
    );
};