import { grpc } from "@improbable-eng/grpc-web";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";
import {RemoveSongRequest, RemoveSongResponse} from "../gen/queue_pb";
import {QueueService} from "../gen/queue_pb_service";
import {host} from "./init";

export const RemoveSong = (guildId: string, userId: string, songIndex: number, completion: (res: RemoveSongResponse) => void, onError: (err: string) => void) => {
    const req = new RemoveSongRequest();
    req.setGuildId(guildId);
    req.setUserId(userId);
    req.setSongIndex(songIndex);
    grpc.unary(QueueService.RemoveSong, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<RemoveSongResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                onError(statusMessage)
            }
        }
    })
}