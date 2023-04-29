import {LoginWithDiscordResponse} from "@/gen/auth";
import {transport} from "@/api/init";
import {DiscordClient} from "@/gen/auth.client";

export const RunLoginWithDiscord = async (code: string, redirect_uri: string, completion: (msg: LoginWithDiscordResponse) => void) => {
    const client = new DiscordClient(transport);
    return client.loginWithDiscord({code: code, redirectUri: redirect_uri});
}