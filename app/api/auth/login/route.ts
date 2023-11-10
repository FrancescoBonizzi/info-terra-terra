import LoginRepository from "../../../../dataLayer/login/LoginRepository";
import {UnauthorizedException} from "../../../../dataLayer/exceptions/UnhautorizedException";
import {FrontendException} from "../../../../dataLayer/exceptions/FrontendException";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {

    const parsedRequest = await request.json();

    try {
        const user = await LoginRepository.loginAsync(
            parsedRequest.username,
            parsedRequest.plainTextPassword);
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