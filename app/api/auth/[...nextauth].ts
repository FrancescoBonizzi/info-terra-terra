import NextAuth from "next-auth"
import {authConfig} from "../../../services/AuthConfig";

export default NextAuth(authConfig);