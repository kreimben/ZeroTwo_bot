import {ValidateUserIdRequest, ValidateUserIdResponse} from "../gen/auth_pb";
import {host} from "./init";
import {Discord} from "../gen/auth_pb_service";
import { grpc } from "@improbable-eng/grpc-web";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";

export const ValidateUserId = (guildId: string, userId: string, completion: (msg: ValidateUserIdResponse) => void, onError: (err: string) => void) => {
    const req = new ValidateUserIdRequest();
    req.setUserId(userId);
    req.setGuildId(guildId);
    grpc.unary(Discord.ValidateUserId, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<ValidateUserIdResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                onError(statusMessage);
            }
        }
    })
}