import {transport} from "./init";
import {QueueServiceClient} from "@/gen/queue.client";

export const RepeatSong = async (guildId: string, userId: string) => {
    const client = new QueueServiceClient(transport);
    return client.repeatSong({guildId: guildId, userId: userId});
}