import {CurrentQueueRequest, CurrentQueueResponse} from "@/gen/queue";
import {transport} from "./init";
import {ServerStreamingCall} from "@protobuf-ts/runtime-rpc";
import {QueueServiceClient} from "@/gen/queue.client";

export class CurrentQueue {
    private readonly streamingCall: ServerStreamingCall<CurrentQueueRequest, CurrentQueueResponse>;

    private static _instance: CurrentQueue | null = null;

    private static lastSavedQueue: CurrentQueueResponse | null = null;

    public static getLastSavedQueue(): CurrentQueueResponse | null {
        return this.lastSavedQueue;
    }

    constructor(guildId: string, userId: string) {
        this.streamingCall = new QueueServiceClient(transport).currentQueue({guildId: guildId, userId: userId});
    }

    public static async register(
        guildId: string,
        userId: string
    ): Promise<string | null> {
        if (this._instance === null) {
            this._instance = new CurrentQueue(guildId, userId);
            for await (let response of this._instance.streamingCall.responses) {
                this.lastSavedQueue = response;
            }
            return null;
        } else {
            return "already have instance of CurrentQueue"
        }
    }

    public static dismiss() {
        this._instance = null
    }
}