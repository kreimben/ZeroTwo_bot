import {transport} from "./init";
import {GetOAuthUrlResponse} from "@/gen/auth";
import {DiscordClient} from "@/gen/auth.client";


export const GetOAuthUrl = async (redirect_url: string) => {
    const client = new DiscordClient(transport);
    return client.getOAuthUrl({redirectUri: redirect_url});
}