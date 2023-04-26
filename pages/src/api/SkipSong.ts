import {grpc} from "@improbable-eng/grpc-web";
import {SkipSongRequest} from "../gen/queue_pb";
import {QueueService} from "../gen/queue_pb_service";
import {host} from "./init";

export const SkipSong = (guildId: string, userId: string, songIndex: number, completion: () => void, onError: (msg: string) => void) => {
    const req = new SkipSongRequest();
    req.setGuildId(guildId);
    req.setUserId(userId);
    req.setSongIndex(songIndex);
    grpc.unary(QueueService.SkipSong, {
        request: req,
        host: host,
        onEnd: res => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion();
            } else {
                onError(statusMessage);
            }
        }
    })
}