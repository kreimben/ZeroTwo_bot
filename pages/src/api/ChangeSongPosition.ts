import { grpc } from "@improbable-eng/grpc-web";
import {ChangeSongPositionRequest} from "../gen/queue_pb";
import {QueueService} from "../gen/queue_pb_service";
import {host} from "./init";

export const ChangeSongPosition = (guildId: string, userId: string, songPositions: number[], completion: () => void, onError: (msg: string) => void) => {
    const req = new ChangeSongPositionRequest();
    req.setGuildId(guildId);
    req.setUserId(userId);
    req.setSongPositionsList(songPositions);
    grpc.unary(QueueService.ChangeSongPosition, {
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
