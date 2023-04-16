import {PlayRequest, PlayResponse} from "../gen/play_pb";
import {host} from "./init";
import {PlayService} from "../gen/play_pb_service";
import { grpc } from "@improbable-eng/grpc-web";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";

export const Play = (guildId: string, userId: string, playUrl:string, completion: (res: PlayResponse)=>void, onError: (err: string) => void) => {
    const req = new PlayRequest();
    req.setGuildId(guildId);
    req.setUserId(userId);
    req.setPlayUrl(playUrl);
    grpc.unary(PlayService.Play, {
        host: host,
        request: req,
        onEnd: (res: UnaryOutput<PlayResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                onError(statusMessage);
            }
        }
    })
}