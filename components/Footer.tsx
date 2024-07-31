'use client'

import {usePathname} from "next/navigation";
import PathNameHelper from "../services/PathNameHelper";
import Constants from "../Constants";
import React from "react";
import Link from "next/link";

export const Footer = () => {

    const pathName = usePathname();

    return (
        <footer>
            <p>&copy; 2023 - {Constants.SiteTitle} - <Link
                className={`text-link ${PathNameHelper.getActiveClassForLink(
                    pathName,
                    Constants.PrivacyPageSlug)}`} href={Constants.PrivacyPageSlug}
                title="Leggi l'informativa sulla privacy">Privacy</Link>
            </p>
        </footer>
    )
};