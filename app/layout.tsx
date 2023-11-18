import React from "react";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import './css/site.css';
import './css/responsive.css';
import {Open_Sans, Secular_One} from "next/font/google";
import {Metadata, Viewport} from "next";

const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-open-sans'
});

const secularOne = Secular_One({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
    variable: '--font-secular-one'
});

export const metadata: Metadata = {
    robots: {
        index: true,
        follow: true
    }
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#423b3b'
}

interface Props {
    children: React.ReactNode;
}

export default function RootLayout(props: Props) {
    return (
        <html
            lang="it"
            className={`${openSans.variable} ${secularOne.variable}`}>

            <body>

            <Header/>

            <main role="main">
                {props.children}
            </main>

            <Footer/>

            </body>

        </html>
    )
}