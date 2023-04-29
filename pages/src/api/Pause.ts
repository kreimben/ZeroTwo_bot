import {PauseResponse} from "@/gen/play";
import {transport} from "./init";
import {PlayServiceClient} from "@/gen/play.client";

export const Pause = async (guildId: string) => {
    const client = new PlayServiceClient(transport);
    return client.pause({guildId: guildId, userId: ""});
}