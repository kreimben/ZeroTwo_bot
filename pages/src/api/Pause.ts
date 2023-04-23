import {grpc} from "@improbable-eng/grpc-web";
import {UnaryOutput} from "@improbable-eng/grpc-web/dist/typings/unary";
import {PauseRequest, PauseResponse} from "../gen/play_pb";
import {PlayService} from "../gen/play_pb_service";
import {host} from "./init";

export const Pause = (guildId: string, completion: (res: PauseResponse) => void, onError: (err: string) => void) => {
    const req = new PauseRequest();
    req.setGuildId(guildId);
    grpc.unary(PlayService.Pause, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<PauseResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                onError(statusMessage);
            }
        }
    })
}