import {redirect, useSearchParams} from "next/navigation";
import {NextRequest} from "next/server";
import {QrOpenRequest} from "../../../dataLayer/tracking/QrOpenRequest";
import VolantiniRepository from "../../../dataLayer/volantini/VolantiniRepository";
import {TrackingSlug} from "../../../dataLayer/tracking/TrackingSlug";
import Constants from "../../../Constants";
import TrackingRepository from "../../../dataLayer/tracking/TrackingRepository";

export async function GET(request: NextRequest) {
    const searchParams = useSearchParams();

    const qrRequest : QrOpenRequest = {
        idVolantino: searchParams.get("idVolantino"),
        citta: searchParams.get("citta"),
        via: searchParams.get("via"),
        luogo: searchParams.get("luogo")
    }

    if (qrRequest.idVolantino == null){
        return redirect(Constants.VolantiniPageSlug);
    }

    const idVolantino = Number(qrRequest.idVolantino);
    const volantino = VolantiniRepository.getById(idVolantino!);

    if (volantino == null){
        return redirect(Constants.VolantiniPageSlug);
    }

    const trackingSlug : TrackingSlug = {
        idVolantino: idVolantino,
        citta: qrRequest.citta,
        via: qrRequest.via,
        luogo: qrRequest.luogo,
        slug: request.url
    }

    await TrackingRepository.insertQrOpenAsync({
         trackingSlug: trackingSlug,
         referer: request.referrer,
         ip: request.ip
     });

    return redirect(`${Constants.VolantiniPageSlug}/${volantino.slug}`);
}
