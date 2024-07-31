'use client'

import Constants from "../Constants";
import React from "react";
import {SiteTitle} from "./SiteTitle";
import {usePathname} from "next/navigation";
import PathNameHelper from "../services/PathNameHelper";
import Link from "next/link";

export const Header = () => {

    const pathName = usePathname();

    return (
        <header>

            <nav>
                <ul>

                    <li>
                        <Link className="header-logo" href="/">
                            <img
                                src="/images/info-terra-terra.png"
                                alt={`Il logo di ${Constants.SiteTitle}`}
                                height="50"/>
                            <SiteTitle/>
                        </Link>
                    </li>

                    <li>
                        <Link className={`text-link margin-horizontal-1rem ${PathNameHelper.getActiveClassForLink(
                            pathName,
                            Constants.ManifestoPageSlug)}`}
                           href={Constants.ManifestoPageSlug}>Manifesto</Link>
                        <Link className={`text-link margin-horizontal-1rem ${PathNameHelper.getActiveClassForLink(
                            pathName,
                            Constants.AiutaciPageSlug)}`}
                           href={Constants.AiutaciPageSlug}>Aiutaci</Link>
                        <Link className={`text-link margin-horizontal-1rem ${PathNameHelper.getActiveClassForLink(
                            pathName,
                            Constants.VolantiniPageSlug)}`}
                           href={Constants.VolantiniPageSlug}>I volantini</Link>
                    </li>

                </ul>
            </nav>

        </header>
    );
}