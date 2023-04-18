import {grpc} from "@improbable-eng/grpc-web";
import { UnaryOutput } from "@improbable-eng/grpc-web/dist/typings/unary";
import {WhereAmIRequest, WhereAmIResponse} from "../gen/voice_channel_pb";
import {VoiceChannelService} from "../gen/voice_channel_pb_service";
import {host} from "./init";

const WhereAmI = (userId: string, guildId: string, completion: (res: WhereAmIResponse) => void, onError: (err: string) => void) => {
    const req = new WhereAmIRequest()
    req.setGuildId(guildId)
    req.setUserId(userId)
    grpc.unary(VoiceChannelService.WhereAmI, {
        request: req,
        host: host,
        onEnd: (res: UnaryOutput<WhereAmIResponse>) => {
            const {status, statusMessage, message} = res
            if (status === grpc.Code.OK && message) {
                completion(message)
            } else {
                onError(statusMessage)
            }
        }
    })
}

class WhereAmIBackground {
    private constructor() {
    }

    private static _instance: WhereAmIBackground | null = null;

    static getInstance(): WhereAmIBackground {
        if (WhereAmIBackground._instance === null) {
            WhereAmIBackground._instance = new WhereAmIBackground()
        }
        return WhereAmIBackground._instance;
    }

    private _interval: NodeJS.Timer | null = null;

    /**
     * This method is for the background service to call `WhereAmI` every 3 seconds.
     */
    public enrollService(userId: string, guildId: string, completion: (res: WhereAmIResponse) => void, onError: (err: string) => void) {
        if (this._interval === null) {
            this._interval = setInterval(() => {
                WhereAmI(userId, guildId, (res) => {
                    completion(res)
                }, (err) => {
                    onError(err)
                })
            }, 3000)
        }
    }
}

export {WhereAmIBackground}