import {Paragraph} from "./Paragraph";

export interface Volantino {
    id: number;
    date: Date;
    title: string;
    slug: string;
    description: string;
    imageNameFronte: string;
    imageNameRetro: string;
    pageUrl: string;
    downloadUrl: string;
    hashTags: string[];
    paragraphs: Paragraph[];
    fonti: string[];
    ogImage: string;
    formattedDate: string;
}