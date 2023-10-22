'use client'

import {usePathname} from "next/navigation";
import PathNameHelper from "../services/PathNameHelper";
import Constants from "../Constants";

export const Footer = () => {

    const pathName = usePathname();

    return (
        <footer>
            <p>&copy; 2023 - @Constants.SiteTitle - <a
                className={`text-link ${PathNameHelper.getActiveClassForLink(
                    pathName,
                    Constants.PrivacyPageSlug)}`} href={Constants.PrivacyPageSlug}
                title="Leggi l'informativa sulla privacy">Privacy</a> - <a className="text-link"
                                                                           href={`mailto:${Constants.EmailAddress}`}
                                                                           title="Mandaci una mail!">Contattaci</a></p>
        </footer>
    )
};