import LoginRepository from "../../../../dataLayer/login/LoginRepository";
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../../dataLayer/login/User";
import {UnauthorizedException} from "../../../../dataLayer/exceptions/UnhautorizedException";
import {FrontendException} from "../../../../dataLayer/exceptions/FrontendException";

export async function POST(
    request: NextApiRequest,
    response: NextApiResponse<User | string>
) {

    try {
        const user = await LoginRepository.loginAsync(
            request.body.username,
            request.body.plainTextPassword);

        // TODO: non funziona status! TypeError: response.status is not a function
        response.status(200).json(user);
    }
    catch (e) {
        if (e instanceof Error && e.name === UnauthorizedException.name)
        {
            response.status(401).send(e.message);
        }
        else if (e instanceof Error && e.name === FrontendException.name)
        {
            response.status(400).send(e.message);
        }

        response.status(500).send('Errore generico');
    }
}