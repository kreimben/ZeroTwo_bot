import {transport} from "./init";
import {WhereAmIRequest, WhereAmIResponse} from "@/gen/voice_channel";
import {VoiceChannelServiceClient} from "@/gen/voice_channel.client";
import {ServerStreamingCall} from "@protobuf-ts/runtime-rpc";


class WhereAmIBackground {
    private readonly streamingCall: ServerStreamingCall<WhereAmIRequest, WhereAmIResponse>;
    private static _instance: WhereAmIBackground | null = null;
    private static lastSavedBackground: WhereAmIResponse | null = null;

    public static getLastSavedBackground() {
        return this.lastSavedBackground;
    }

    constructor(userId: string, guildId: string) {
        this.streamingCall = new VoiceChannelServiceClient(transport).whereAmI({userId, guildId});
    }

    public static async enrollService(userId: string, guildId: string) {
        if (this._instance === null) {
            this._instance = new WhereAmIBackground(userId, guildId);
            for await (let res of this._instance.streamingCall.responses) {
                this.lastSavedBackground = res;
            }
        }
    }
}

export {WhereAmIBackground}