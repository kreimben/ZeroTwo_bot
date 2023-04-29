import {transport} from "./init";
import {QueueServiceClient} from "@/gen/queue.client";

export const ShuffleQueue = async (guildId: string) => {
    const client = new QueueServiceClient(transport);
    return client.shuffleQueue({guildId: guildId, userId: ""});
}