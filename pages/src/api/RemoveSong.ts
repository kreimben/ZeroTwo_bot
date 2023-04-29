import {RemoveSongResponse} from "@/gen/queue";
import {transport} from "./init";
import {QueueServiceClient} from "@/gen/queue.client";

export const RemoveSong = async (guildId: string, userId: string, songIndex: number, completion: (res: RemoveSongResponse) => void, onError: (err: string) => void) => {
    const client = new QueueServiceClient(transport);
    const res = await client.removeSong({guildId: guildId, userId: userId, songIndex: songIndex});
    if (res.status.code === '200') {
        completion(res.response);
    } else {
        onError(res.status.detail);
    }
}