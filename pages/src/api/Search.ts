import {SearchRequest, SearchResponse} from "../gen/play_pb";
import {host} from "./init";
import {PlayService} from "../gen/play_pb_service";
import {grpc} from "@improbable-eng/grpc-web";
import {UnaryOutput} from "@improbable-eng/grpc-web/dist/typings/unary";

export const Search = (keyword: string | null, url: string | null, completion: (res: SearchResponse) => void, onError : (err: string) => void) => {
    const req = new SearchRequest();
    if (keyword != null) req.setKeyword(keyword);
    if (url != null) req.setUrl(url);
    req.setAmount(1)
    grpc.unary(PlayService.Search, {
        host: host,
        request: req,
        onEnd: (res: UnaryOutput<SearchResponse>) => {
            const {status, statusMessage, headers, message, trailers} = res;
            if (status === grpc.Code.OK && message) {
                completion(message);
            } else {
                onError(statusMessage);
            }
        }
    })
}