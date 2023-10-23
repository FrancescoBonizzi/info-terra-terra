import React from "react";
import {SiteHead} from "../components/SiteHead";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import './css/site.css';
import './css/responsive.css';
import {Open_Sans, Secular_One} from "next/font/google";

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

interface Props {
    children: React.ReactNode;
}

export default function RootLayout(props: Props) {
    return (
        <html
            lang="it"
            className={`${openSans.variable} ${secularOne.variable}`}>

            <SiteHead/>

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