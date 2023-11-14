import {redirect} from "next/navigation";
import {QrOpenRequest} from "../../dataLayer/tracking/QrOpenRequest";
import Constants from "../../Constants";
import VolantiniRepository from "../../dataLayer/volantini/VolantiniRepository";
import {TrackingSlug} from "../../dataLayer/tracking/TrackingSlug";
import TrackingRepository from "../../dataLayer/tracking/TrackingRepository";
import { headers } from 'next/headers'

export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | undefined }
}) {

    if (!searchParams){
        return redirect(Constants.VolantiniPageSlug);
    }

    const qrRequest : QrOpenRequest = {
        idVolantino: searchParams["idVolantino"],
        citta: searchParams["citta"],
        via: searchParams["via"],
        luogo: searchParams["luogo"]
    }

    if (qrRequest.idVolantino == null){
        return redirect(Constants.VolantiniPageSlug);
    }

    const idVolantino = Number(qrRequest.idVolantino);
    const volantino = VolantiniRepository.getById(idVolantino!);

    if (volantino == null){
        return redirect(Constants.VolantiniPageSlug);
    }

    const headersList = headers();

    const trackingSlug : TrackingSlug = {
        idVolantino: idVolantino,
        citta: qrRequest.citta,
        via: qrRequest.via,
        luogo: qrRequest.luogo,
        slug: 'TODO searchParams mappalo oppure scopri come si fa ad ottenere il path della request'
    }

    console.log(trackingSlug);

    await TrackingRepository.insertQrOpenAsync({
        trackingSlug: trackingSlug,
        os: headersList.get('user-agent'),
        referer: headersList.get('referer'),
        ip: headersList.get('x-forwarded-for')
            || headersList.get('x-real-ip')
            || headersList.get('x-client-ip')
            || headersList.get('x-forwarded')
            || headersList.get('forwarded-for')
            || headersList.get('cf-connecting-ip')
    });

    return redirect(`${Constants.VolantiniPageSlug}/${volantino.slug}`);
}

