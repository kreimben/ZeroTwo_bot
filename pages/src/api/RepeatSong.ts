import { grpc } from "@improbable-eng/grpc-web";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";
import {RepeatSongRequest, RepeatSongResponse} from "../gen/queue_pb";
import {QueueService} from "../gen/queue_pb_service";
import {host} from "./init";

export const RepeatSong = (guildId: string, userId: string, completion: (isRepeat: boolean) => void, onError: (msg: string) => void) => {
    const req = new RepeatSongRequest();
    req.setGuildId(guildId);
    req.setUserId(userId);
    grpc.unary(QueueService.RepeatSong, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<RepeatSongResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message.getResult());
            } else {
                onError(statusMessage);
            }
        }
    })
}