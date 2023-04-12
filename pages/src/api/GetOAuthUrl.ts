import {grpc} from '@improbable-eng/grpc-web';
import {Discord} from "../gen/auth_pb_service";
import {ProtobufMessage} from "@improbable-eng/grpc-web/dist/typings/message";
import {GetOAuthUrlRequest, GetOAuthUrlResponse} from "../gen/auth_pb";
import {host} from "./init";
import {UnaryOutput} from '@improbable-eng/grpc-web/dist/typings/unary';


export const GetOAuthUrl = (redirect_url: string, completion: (msg: GetOAuthUrlResponse) => void) => {
    const req = new GetOAuthUrlRequest();
    req.setRedirectUri(redirect_url);
    grpc.unary(Discord.GetOAuthUrl, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<GetOAuthUrlResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                console.error(`GetOAuthUrl: ${statusMessage}`)
            }
        }
    });
}