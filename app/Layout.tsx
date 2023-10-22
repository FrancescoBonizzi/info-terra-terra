import React, {ReactNode} from "react";
import {SiteHead} from "../components/Head";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";

export interface RootLayoutProps {
    title: string;
    description: string;
    scripts?: ReactNode;
}

interface Props {
    children: React.ReactNode;
    params: RootLayoutProps;
}

export default function RootLayout(props: Props) {
    return (
        <html lang="it">
        <SiteHead
            title={props.params.title}
            description={props.params.description}/>

        <body>

        <Header/>

        <main role="main">
            {props.children}
        </main>

        <Footer/>

        <script src="/js/site.js"></script>
        {props.params.scripts}

        </body>
        </html>
    )
}