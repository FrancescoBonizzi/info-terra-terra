import 'server-only';

import {User} from "./User";
import {UnauthorizedException} from "./UnhautorizedException";

const _users: User[] = [
    {
        username: "francesco-ionico",
        name: "Francesco",
        password: "Tail Chair Despair Trial-The-Detail Most-Tend Too-Minister-0"
    },
    {
        username: "cristina-tazzina",
        name: "Caterina",
        password: "Choose Then-Rotten Monkey-Hollow-Only Queen Messenger-Remark Highway-6"
    }
];

export default {
    loginAsync: async (username: string, password: string)  => {
        const user = _users.find(u => u.username === username && u.password === password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}