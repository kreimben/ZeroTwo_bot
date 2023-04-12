import {grpc} from "@improbable-eng/grpc-web";
import {ProtobufMessage} from "@improbable-eng/grpc-web/dist/typings/message";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";
import {LoginWithDiscordRequest, LoginWithDiscordResponse} from "../gen/auth_pb";
import {Discord} from "../gen/auth_pb_service";
import {host} from "./init";

export const RunLoginWithDiscord = (code: string, redirect_uri: string, completion: (msg: LoginWithDiscordResponse) => void) => {
    const req = new LoginWithDiscordRequest();
    req.setCode(code);
    req.setRedirectUri(redirect_uri);
    grpc.unary(Discord.LoginWithDiscord, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<LoginWithDiscordResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                console.error(`LoginWithDiscord: ${statusMessage}`)
            }
        }
    })
}