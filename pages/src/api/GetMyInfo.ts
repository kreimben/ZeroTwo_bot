import { grpc } from "@improbable-eng/grpc-web";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";
import {GetMyInfoRequest, GetMyInfoResponse} from "../gen/auth_pb";
import {Discord} from "../gen/auth_pb_service";
import {host} from "./init";

export const GetMyInfo = (accessToken: string, completion: (GetMyInfoResponse) => void) => {
    const req = new GetMyInfoRequest();
    req.setAccessToken(accessToken);
    grpc.unary(Discord.GetMyInfo, {
        host: host,
        request: req,
        onEnd: (res: UnaryOutput<GetMyInfoResponse>) => {
            const { status, statusMessage, headers, message, trailers } = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                console.log(statusMessage);
            }
        }
    })
}