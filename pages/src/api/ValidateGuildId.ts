import {grpc} from "@improbable-eng/grpc-web";
import {UnaryOutput} from "@improbable-eng/grpc-web/dist/typings/unary";
import {ValidateGuildIdRequest, ValidateGuildIdResponse, ValidateUserIdResponse} from "../gen/auth_pb";
import {Discord} from "../gen/auth_pb_service";
import {host} from "./init";

export const ValidateGuildId = (guildId: string, completion: (msg: ValidateGuildIdResponse) => void, onError: (err: string) => void) => {
    const req = new ValidateGuildIdRequest();
    req.setGuildId(guildId);
    grpc.unary(Discord.ValidateGuildId, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<ValidateGuildIdResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                onError(statusMessage);
            }
        }
    })
}