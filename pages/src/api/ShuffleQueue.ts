import {grpc} from "@improbable-eng/grpc-web";
import {ShuffleQueueRequest} from "../gen/queue_pb";
import {QueueService} from "../gen/queue_pb_service";
import {host} from "./init";

export const ShuffleQueue = (guildId: string, completion: () => void, onError: (error: string) => void) => {
    const req = new ShuffleQueueRequest();
    req.setGuildId(guildId);
    grpc.unary(QueueService.ShuffleQueue, {
        request: req,
        host: host,
        onEnd: res => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion()
            } else {
                onError(statusMessage)
            }
        }
    })
}