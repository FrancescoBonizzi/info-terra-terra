import {redirect} from "next/navigation";
import Constants from "../../Constants";
import VolantiniRepository from "../../dataLayer/volantini/VolantiniRepository";
import {QrOpenRequest} from "../../dataLayer/tracking/QrOpenRequest";

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

    return redirect(`${Constants.VolantiniPageSlug}/${volantino.slug}`);
}

