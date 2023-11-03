import LoginRepository from "../../../../dataLayer/login/LoginRepository";
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../../dataLayer/login/User";

export async function POST(
    request: NextApiRequest,
    response: NextApiResponse<User>
) {

    const user = await LoginRepository.loginAsync(
        request.body.username,
        request.body.plainTextPassword);

    response.status(200).json(user);
}


// TODO: Non riesce a fare la chiamata API (CREDO) per il login dalla form