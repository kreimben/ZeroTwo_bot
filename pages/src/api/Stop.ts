import {grpc} from "@improbable-eng/grpc-web";
import {UnaryOutput} from "@improbable-eng/grpc-web/dist/typings/unary";
import {StopRequest, StopResponse} from "../gen/play_pb";
import {PlayService} from "../gen/play_pb_service";
import {host} from "./init";

export const Stop = (guildId: string, userId: string, completion: (res: StopResponse) => void, onError: (err: string) => void) => {
    const req = new StopRequest();
    req.setGuildId(guildId);
    req.setUserId(userId);
    grpc.unary(PlayService.Stop, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<StopResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                onError(statusMessage);
            }
        }
    })
}