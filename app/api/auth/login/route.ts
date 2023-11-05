import LoginRepository from "../../../../dataLayer/login/LoginRepository";
import {NextApiRequest} from "next";
import {UnauthorizedException} from "../../../../dataLayer/exceptions/UnhautorizedException";
import {FrontendException} from "../../../../dataLayer/exceptions/FrontendException";
import {NextResponse} from "next/server";

export async function POST(
    request: NextApiRequest) {

    console.log(request.body.username);
    console.log(request.body.plainTextPassword);

    try {
        const user = await LoginRepository.loginAsync(
            request.body.username,
            request.body.plainTextPassword);
        return NextResponse.json(user);
    }
    catch (e) {
        if (e instanceof Error && e.name === UnauthorizedException.name)
        {
            return new Response(e.message, {status: 401});
        }
        else if (e instanceof Error && e.name === FrontendException.name)
        {
            return new Response(e.message, {status: 400});
        }

        return new Response('Errore generico', {status: 500});
    }
}