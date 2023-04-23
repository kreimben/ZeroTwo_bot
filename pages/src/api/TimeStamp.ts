import {grpc} from "@improbable-eng/grpc-web";
import {CurrentQueueRequest, TimeStampRequest, TimeStampResponse} from "../gen/queue_pb";
import {QueueService} from "../gen/queue_pb_service";
import {host} from "./init";

export class TimeStamp {
    private readonly req: TimeStampRequest;
    private readonly client: grpc.Client<TimeStampRequest, TimeStampResponse>;

    private static _instance: TimeStamp | null = null;

    private static lastSavedTimeStamp: TimeStampResponse | null = null;

    public static getLastSavedTimeStamp(): TimeStampResponse | null {
        return this.lastSavedTimeStamp;
    }

    constructor(guildId: string) {
        this.req = new CurrentQueueRequest();
        this.req.setGuildId(guildId);
        this.client = grpc.client(QueueService.TimeStamp, {
            host: host,
        });
    }

    public static register(
        guildId: string,
        onEnd: (msg: string) => void,
        onError: (err: string) => void
    ): string {
        if (this._instance === null) {
            this._instance = new TimeStamp(guildId);
            this._instance.client.onMessage((res: TimeStampResponse) => {
                this.lastSavedTimeStamp = res;
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
            return "already have instance of TimeStamp"
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