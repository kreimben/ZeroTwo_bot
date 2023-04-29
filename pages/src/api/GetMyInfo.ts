import {GetMyInfoResponse} from "@/gen/auth";
import {DiscordClient} from "@/gen/auth.client";
import {transport} from "@/api/init";

export const GetMyInfo = async (accessToken: string) => {
    const client = new DiscordClient(transport);
    return client.getMyInfo({accessToken: accessToken});
}