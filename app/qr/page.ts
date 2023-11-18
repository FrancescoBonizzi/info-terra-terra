import {redirect} from "next/navigation";
import {QrOpenRequest} from "../../dataLayer/tracking/QrOpenRequest";
import Constants from "../../Constants";
import VolantiniRepository from "../../dataLayer/volantini/VolantiniRepository";
import {TrackingSlug} from "../../dataLayer/tracking/TrackingSlug";
import TrackingRepository from "../../dataLayer/tracking/TrackingRepository";
import {headers} from 'next/headers'
import StringHelper from "../../services/StringHelper";

export default async function Page({
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | undefined }
}) {

    if (!searchParams) {
        return redirect(Constants.VolantiniPageSlug);
    }

    const qrRequest: QrOpenRequest = {
        idVolantino: searchParams["idVolantino"],
        citta: searchParams["citta"],
        via: searchParams["via"],
        luogo: searchParams["luogo"]
    }

    if (qrRequest.idVolantino == null) {
        return redirect(Constants.VolantiniPageSlug);
    }

    const idVolantino = Number(qrRequest.idVolantino);

    if (isNaN(idVolantino)) {
        return redirect(Constants.VolantiniPageSlug);
    }

    const volantino = VolantiniRepository.getById(idVolantino);

    if (!volantino) {
        return redirect(Constants.VolantiniPageSlug);
    }

    const headersList = headers();

    // Purtroppo devo ricostruirlo perchè NextJs non mi dà accesso by design alla query string
    const qrRequestSearchParams= Object
        .entries(searchParams)
        .filter(([, value]) => !StringHelper.isNullOrWhitespace(value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    const trackingSlug: TrackingSlug = {
        idVolantino: idVolantino,
        citta: qrRequest.citta,
        via: qrRequest.via,
        luogo: qrRequest.luogo,
        slug: qrRequestSearchParams
    }

    await TrackingRepository.insertQrOpenAsync({
        trackingSlug: trackingSlug,
        os: headersList.get('user-agent'),
        referer: headersList.get('referer'),
        ip: headersList.get('x-forwarded-for')
            ?? headersList.get('x-real-ip')
            ?? headersList.get('x-client-ip')
            ?? headersList.get('x-forwarded')
            ?? headersList.get('forwarded-for')
            ?? headersList.get('cf-connecting-ip')
    });

    return redirect(`${Constants.VolantiniPageSlug}/${volantino.slug}`);
}

