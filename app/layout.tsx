import React, {ReactNode} from "react";
import {SiteHead} from "../components/SiteHead";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";

interface Props {
    children: React.ReactNode;
}

export default function RootLayout(props: Props) {
    return (
        <html lang="it">

            <SiteHead/>

            <body>

            <Header/>

            <main role="main">
                {props.children}
            </main>

            <Footer/>

            <script src="/js/site.js"></script>

            </body>

        </html>
    )
}