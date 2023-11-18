import NextAuth from "next-auth"
import {authConfig} from "../../../../services/AuthConfig";

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST};