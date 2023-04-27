import {CurrentQueueRequest, CurrentQueueResponse} from "../gen/queue_pb";
import {host} from "./init";
import {QueueService} from "../gen/queue_pb_service";
import {grpc} from "@improbable-eng/grpc-web";

export class CurrentQueue {
    private readonly req: CurrentQueueRequest;
    private readonly client: grpc.Client<CurrentQueueRequest, CurrentQueueResponse>;

    private static _instance: CurrentQueue | null = null;

    private static lastSavedQueue: CurrentQueueResponse | null = null;

    public static getLastSavedQueue(): CurrentQueueResponse | null {
        return this.lastSavedQueue;
    }

    constructor(guildId: string, userId: string) {
        this.req = new CurrentQueueRequest();
        this.req.setGuildId(guildId);
        this.req.setUserId(userId);
        this.client = grpc.client(QueueService.CurrentQueue, {
            host: host,
        });
    }

    public static register(
        guildId: string,
        userId: string,
        onEnd: (msg: string) => void,
        onError: (err: string) => void
    ): string {
        if (this._instance === null) {
            this._instance = new CurrentQueue(guildId, userId);
            this._instance.client.onMessage((res: CurrentQueueResponse) => {
                this.lastSavedQueue = res;
            });
            this._instance.client.onEnd((code: grpc.Code, msg: string, _: grpc.Metadata) => {
                if (code != grpc.Code.OK) {
                    onError(msg);
                } else {
                    onEnd(msg);
                }
            });
            this._instance.startClient();
            return null;
        } else {
            return "already have instance of CurrentQueue"
        }
    }

    public static dismiss() {
        if (this._instance !== null && this._instance.client !== null) {
            this._instance.client.finishSend()
            this._instance.client.close();
        }
        this._instance = null
    }

    private startClient() {
        this.client.start();
        this.client.send(this.req);
    }
}