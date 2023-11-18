import React from "react";
import Link from "next/link";
import {Volantino} from "../dataLayer/volantini/Volantino";
import Image from "next/image";

export const VolantinoPreviewCard = (props: Volantino) => {
    return (
        <div className="homepage-volantino-container">

            <div className="homepage-volantino-image-text-container">
                <Image
                    src={`/images/${props.imageNameFronte}`}
                    alt="La foto del volatino @Model.Title"/>
                <div className="homepage-volantino-text-container">

                    <div className="badge-container partial-volantino-badge-container">
                        {props.hashTags.map((hashTag) =>
                            <span key={hashTag} className="text-less-important-badge">{hashTag}</span>
                        )}
                    </div>

                    <div className="flex-vertical">
                        <span className="partial-volantino-title">{props.title}</span>
                        <span className="partial-volantino-date">{props.formattedDate}</span>
                    </div>

                    <p className="partial-volantino-description">{props.description}…</p>
                    <Link className="action-button-secondary centered-in-mobile" href={props.pageUrl}>Leggi di
                        più &rsaquo;</Link>
                </div>
            </div>
        </div>
    )
};