// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "queue.proto" (package "queue", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { QueueService } from "./queue";
import type { TimeStampResponse } from "./queue";
import type { TimeStampRequest } from "./queue";
import type { ChangeSongPositionResponse } from "./queue";
import type { ChangeSongPositionRequest } from "./queue";
import type { ShuffleQueueResponse } from "./queue";
import type { ShuffleQueueRequest } from "./queue";
import type { RepeatSongResponse } from "./queue";
import type { RepeatSongRequest } from "./queue";
import type { SkipSongResponse } from "./queue";
import type { SkipSongRequest } from "./queue";
import type { RemoveSongResponse } from "./queue";
import type { RemoveSongRequest } from "./queue";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { CurrentQueueResponse } from "./queue";
import type { CurrentQueueRequest } from "./queue";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service queue.QueueService
 */
export interface IQueueServiceClient {
    /**
     * *
     * Streaming rpc.
     * Respond when below rpcs are called.
     * - SkipSong
     * - RemoveSong
     * - ShuffleQueue
     * - ChangeSongPosition
     *
     * @generated from protobuf rpc: CurrentQueue(queue.CurrentQueueRequest) returns (stream queue.CurrentQueueResponse);
     */
    currentQueue(input: CurrentQueueRequest, options?: RpcOptions): ServerStreamingCall<CurrentQueueRequest, CurrentQueueResponse>;
    /**
     * @generated from protobuf rpc: RemoveSong(queue.RemoveSongRequest) returns (queue.RemoveSongResponse);
     */
    removeSong(input: RemoveSongRequest, options?: RpcOptions): UnaryCall<RemoveSongRequest, RemoveSongResponse>;
    /**
     * @generated from protobuf rpc: SkipSong(queue.SkipSongRequest) returns (queue.SkipSongResponse);
     */
    skipSong(input: SkipSongRequest, options?: RpcOptions): UnaryCall<SkipSongRequest, SkipSongResponse>;
    /**
     * @generated from protobuf rpc: RepeatSong(queue.RepeatSongRequest) returns (queue.RepeatSongResponse);
     */
    repeatSong(input: RepeatSongRequest, options?: RpcOptions): UnaryCall<RepeatSongRequest, RepeatSongResponse>;
    /**
     * @generated from protobuf rpc: ShuffleQueue(queue.ShuffleQueueRequest) returns (queue.ShuffleQueueResponse);
     */
    shuffleQueue(input: ShuffleQueueRequest, options?: RpcOptions): UnaryCall<ShuffleQueueRequest, ShuffleQueueResponse>;
    /**
     * @generated from protobuf rpc: ChangeSongPosition(queue.ChangeSongPositionRequest) returns (queue.ChangeSongPositionResponse);
     */
    changeSongPosition(input: ChangeSongPositionRequest, options?: RpcOptions): UnaryCall<ChangeSongPositionRequest, ChangeSongPositionResponse>;
    /**
     * @generated from protobuf rpc: TimeStamp(queue.TimeStampRequest) returns (stream queue.TimeStampResponse);
     */
    timeStamp(input: TimeStampRequest, options?: RpcOptions): ServerStreamingCall<TimeStampRequest, TimeStampResponse>;
}
/**
 * @generated from protobuf service queue.QueueService
 */
export class QueueServiceClient implements IQueueServiceClient, ServiceInfo {
    typeName = QueueService.typeName;
    methods = QueueService.methods;
    options = QueueService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * *
     * Streaming rpc.
     * Respond when below rpcs are called.
     * - SkipSong
     * - RemoveSong
     * - ShuffleQueue
     * - ChangeSongPosition
     *
     * @generated from protobuf rpc: CurrentQueue(queue.CurrentQueueRequest) returns (stream queue.CurrentQueueResponse);
     */
    currentQueue(input: CurrentQueueRequest, options?: RpcOptions): ServerStreamingCall<CurrentQueueRequest, CurrentQueueResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CurrentQueueRequest, CurrentQueueResponse>("serverStreaming", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: RemoveSong(queue.RemoveSongRequest) returns (queue.RemoveSongResponse);
     */
    removeSong(input: RemoveSongRequest, options?: RpcOptions): UnaryCall<RemoveSongRequest, RemoveSongResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<RemoveSongRequest, RemoveSongResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: SkipSong(queue.SkipSongRequest) returns (queue.SkipSongResponse);
     */
    skipSong(input: SkipSongRequest, options?: RpcOptions): UnaryCall<SkipSongRequest, SkipSongResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<SkipSongRequest, SkipSongResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: RepeatSong(queue.RepeatSongRequest) returns (queue.RepeatSongResponse);
     */
    repeatSong(input: RepeatSongRequest, options?: RpcOptions): UnaryCall<RepeatSongRequest, RepeatSongResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<RepeatSongRequest, RepeatSongResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ShuffleQueue(queue.ShuffleQueueRequest) returns (queue.ShuffleQueueResponse);
     */
    shuffleQueue(input: ShuffleQueueRequest, options?: RpcOptions): UnaryCall<ShuffleQueueRequest, ShuffleQueueResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<ShuffleQueueRequest, ShuffleQueueResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ChangeSongPosition(queue.ChangeSongPositionRequest) returns (queue.ChangeSongPositionResponse);
     */
    changeSongPosition(input: ChangeSongPositionRequest, options?: RpcOptions): UnaryCall<ChangeSongPositionRequest, ChangeSongPositionResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<ChangeSongPositionRequest, ChangeSongPositionResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: TimeStamp(queue.TimeStampRequest) returns (stream queue.TimeStampResponse);
     */
    timeStamp(input: TimeStampRequest, options?: RpcOptions): ServerStreamingCall<TimeStampRequest, TimeStampResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<TimeStampRequest, TimeStampResponse>("serverStreaming", this._transport, method, opt, input);
    }
}