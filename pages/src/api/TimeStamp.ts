import {TimeStampRequest, TimeStampResponse} from "@/gen/queue";
import {QueueServiceClient} from "@/gen/queue.client";
import {transport} from "@/api/init";
import {ServerStreamingCall} from "@protobuf-ts/runtime-rpc";

export class TimeStamp {
    private readonly streamingCall: ServerStreamingCall<TimeStampRequest, TimeStampResponse>;

    private static _instance: TimeStamp | null = null;

    private static lastSavedTimeStamp: TimeStampResponse | null = null;

    public static getLastSavedTimeStamp(): TimeStampResponse | null {
        return this.lastSavedTimeStamp;
    }

    constructor(guildId: string) {
        this.streamingCall = new QueueServiceClient(transport).timeStamp({guildId: guildId});
    }

    public static async register(
        guildId: string
    ): Promise<string | null> {
        if (this._instance === null) {
            this._instance = new TimeStamp(guildId);
            for await (let response of this._instance.streamingCall.responses) {
                this.lastSavedTimeStamp = response;
            }
            return null;
        } else {
            return "already have instance of TimeStamp"
        }
    }

    public static dismiss() {
        this._instance = null
    }
}