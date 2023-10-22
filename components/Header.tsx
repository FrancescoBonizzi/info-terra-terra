'use client'

import Constants from "../Constants";
import React from "react";
import {SiteTitle} from "./SiteTitle";
import {usePathname} from "next/navigation";
import PathNameHelper from "../services/PathNameHelper";

export const Header = () => {

    const pathName = usePathname();

    return (
        <header>

            <nav>
                <ul>

                    <li>
                        <a className="header-logo" href="/">
                            <img
                                src="/images/info-terra-terra.png"
                                alt={`Il logo di ${Constants.SiteTitle}`}
                                height="50"/>
                            <SiteTitle/>
                        </a>
                    </li>

                    <li>
                        <a className={`text-link margin-horizontal-1rem ${PathNameHelper.getActiveClassForLink(
                            pathName,
                            Constants.ManifestoPageSlug)}`}
                           href={Constants.ManifestoPageSlug}>Manifesto</a>
                        <a className={`text-link margin-horizontal-1rem ${PathNameHelper.getActiveClassForLink(
                            pathName,
                            Constants.AiutaciPageSlug)}`}
                           href={Constants.AiutaciPageSlug}>Aiutaci</a>
                        <a className={`text-link margin-horizontal-1rem ${PathNameHelper.getActiveClassForLink(
                            pathName,
                            Constants.VolantiniPageSlug)}`}
                           href={Constants.VolantiniPageSlug}>I volantini</a>
                    </li>

                    <li>
                        <a className={PathNameHelper.getActiveClassButtonForLink(
                            pathName,
                            Constants.NewsletterPageSlug)}
                           href={Constants.NewsletterPageSlug}>✉️ Iscriviti alla newsletter</a>
                    </li>

                </ul>
            </nav>

        </header>
    );
}