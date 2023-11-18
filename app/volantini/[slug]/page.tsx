import {notFound} from "next/navigation";
import {MetaDataHelper} from "../../../services/MetaDataHelper";
import {Metadata} from "next";
import VolantiniRepository from "../../../dataLayer/volantini/VolantiniRepository";
import React from "react";
import Image from "next/image";

interface Props {
    params: {
        slug: string
    }
}

export function generateMetadata(props: Props): Metadata | undefined {

    const volantino = VolantiniRepository.getBySlug(props.params.slug);

    if (!volantino) {
        return undefined;
    }

    return MetaDataHelper.generateMetadata(
        volantino.slug,
        volantino.title,
        volantino.description,
        volantino.ogImage);
}

export default function Page(props: Readonly<Props>) {

    const volantino = VolantiniRepository.getBySlug(props.params.slug);

    if (!volantino) {
        notFound();
    }

    return (
        <article>

            <section>
                <div className="section-content">

                    <h1>{volantino.title}</h1>
                    <h2>{volantino.description}</h2>
                    <div className="margin-top-1rem flex-vertical centered-in-mobile">

                        {volantino.fonti.map((link, index) => {
                            const fontNumberString = index === 0
                                ? null
                                : `(Fonte ${index + 1})`;
                            return (
                                <a key={link}
                                    href={link}
                                   rel={"noreferrer"}
                                   target="_blank"
                                   className="action-button-secondary centered-in-mobile">
                                    Approfondisci direttamente alla fonte dei dati {fontNumberString}
                                </a>
                            )
                        })}

                    </div>
                </div>

            </section>

            {
                volantino.paragraphs.map((paragraph, index) => {
                    const isEven = index % 2 === 0;
                    const sectionClass = isEven
                        ? "bg-alt"
                        : "";

                    return (
                        <section className={sectionClass} key={paragraph.id}>
                            <div className="section-content">

                                {paragraph.imageRelativePath && (
                                    <Image
                                        src={`/images/${paragraph.imageRelativePath}`}
                                        alt={paragraph.imageAltText ?? "Immagine"}
                                        className="paragraph-image"/>
                                )}

                                {paragraph.title && (
                                    <h3>
                                        <strong>{paragraph.title}</strong>
                                    </h3>
                                )}

                                {paragraph.text && (
                                    <p dangerouslySetInnerHTML={{ __html: paragraph.text }}>
                                    </p>
                                )}
                            </div>
                        </section>

                    );
                })
            }

            <section className="bg-cta">

                <a href={volantino.downloadUrl} className="action-button">
                    &darr; Scarica il volantino in PDF e invialo a qualcuno!
                </a>

                <div className="badge-container margin-top-1rem">
                    <span className="text-less-important-badge">{volantino.formattedDate}</span>
                    {volantino.hashTags.map((hashtag) => {
                        return (
                            <span key={hashtag} className="text-less-important-badge">{hashtag}</span>
                        )
                    })}
                </div>

            </section>

        </article>
    )
}