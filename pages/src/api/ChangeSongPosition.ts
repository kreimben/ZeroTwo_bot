import {QueueServiceClient} from "@/gen/queue.client";
import {transport} from "@/api/init";

export const ChangeSongPosition = async (guildId: string, userId: string, songPositions: number[]) => {
    const client = new QueueServiceClient(transport);
    return client.changeSongPosition({guildId: guildId, userId: userId, songPositions: songPositions});
}
