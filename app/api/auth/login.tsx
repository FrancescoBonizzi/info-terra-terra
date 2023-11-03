import {NextApiRequest, NextApiResponse} from "next";
import LoginRepository from "../../../dataLayer/login/LoginRepository";
import {User} from "../../../dataLayer/login/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>) {

    const user = await LoginRepository.loginAsync(
        req.body.username,
        req.body.plainTextPassword);

    res.status(200).json(user);
}
