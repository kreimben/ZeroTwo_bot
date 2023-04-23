import { grpc } from "@improbable-eng/grpc-web";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";
import {PauseRequest, PauseResponse, ResumeRequest, ResumeResponse} from "../gen/play_pb";
import {PlayService} from "../gen/play_pb_service";
import {host} from "./init";

export const Resume = (guildId: string, completion: (res: ResumeResponse) => void, onError: (err: string) => void) => {
    const req = new ResumeRequest();
    req.setGuildId(guildId);
    grpc.unary(PlayService.Resume, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<ResumeResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                onError(statusMessage);
            }
        }
    })
}