import {transport} from "./init";
import {QueueServiceClient} from "@/gen/queue.client";

export const SkipSong = async (guildId: string, userId: string, songIndex: number, completion: () => void, onError: (msg: string) => void) => {
    const client = new QueueServiceClient(transport);
    const res = await client.skipSong({guildId: guildId, userId: userId, songIndex: songIndex});
    if (res.status.code === '200') {
        completion();
    } else {
        onError(res.status.detail);
    }
}