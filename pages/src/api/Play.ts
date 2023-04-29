import {PlayResponse} from "@/gen/play";
import {transport} from "./init";
import {PlayServiceClient} from "@/gen/play.client";

export const Play = async (guildId: string, userId: string, playUrl: string) => {
    const client = new PlayServiceClient(transport);
    return client.play({guildId: guildId, userId: userId, playUrl: playUrl});
}