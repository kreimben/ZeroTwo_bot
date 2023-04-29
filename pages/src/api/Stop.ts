import {StopResponse} from "@/gen/play";
import {transport} from "./init";
import {PlayServiceClient} from "@/gen/play.client";

export const Stop = async (guildId: string, userId: string) => {
    const client = new PlayServiceClient(transport);
    return client.stop({guildId: guildId, userId: userId});
}