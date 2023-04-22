// package: queue
// file: queue.proto

import * as queue_pb from "./queue_pb";
import {grpc} from "@improbable-eng/grpc-web";

type QueueServiceCurrentQueue = {
  readonly methodName: string;
  readonly service: typeof QueueService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof queue_pb.CurrentQueueRequest;
  readonly responseType: typeof queue_pb.CurrentQueueResponse;
};

type QueueServiceRemoveSong = {
  readonly methodName: string;
  readonly service: typeof QueueService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof queue_pb.RemoveSongRequest;
  readonly responseType: typeof queue_pb.RemoveSongResponse;
};

type QueueServiceSkipSong = {
  readonly methodName: string;
  readonly service: typeof QueueService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof queue_pb.SkipSongRequest;
  readonly responseType: typeof queue_pb.SkipSongResponse;
};

type QueueServiceRepeatSong = {
  readonly methodName: string;
  readonly service: typeof QueueService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof queue_pb.RepeatSongRequest;
  readonly responseType: typeof queue_pb.RepeatSongResponse;
};

type QueueServiceShuffleQueue = {
  readonly methodName: string;
  readonly service: typeof QueueService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof queue_pb.ShuffleQueueRequest;
  readonly responseType: typeof queue_pb.ShuffleQueueResponse;
};

type QueueServiceChangeSongPosition = {
  readonly methodName: string;
  readonly service: typeof QueueService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof queue_pb.ChangeSongPositionRequest;
  readonly responseType: typeof queue_pb.ChangeSongPositionResponse;
};

type QueueServiceTimeStamp = {
  readonly methodName: string;
  readonly service: typeof QueueService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof queue_pb.TimeStampRequest;
  readonly responseType: typeof queue_pb.TimeStampResponse;
};

export class QueueService {
  static readonly serviceName: string;
  static readonly CurrentQueue: QueueServiceCurrentQueue;
  static readonly RemoveSong: QueueServiceRemoveSong;
  static readonly SkipSong: QueueServiceSkipSong;
  static readonly RepeatSong: QueueServiceRepeatSong;
  static readonly ShuffleQueue: QueueServiceShuffleQueue;
  static readonly ChangeSongPosition: QueueServiceChangeSongPosition;
  static readonly TimeStamp: QueueServiceTimeStamp;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class QueueServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  currentQueue(requestMessage: queue_pb.CurrentQueueRequest, metadata?: grpc.Metadata): ResponseStream<queue_pb.CurrentQueueResponse>;
  removeSong(
    requestMessage: queue_pb.RemoveSongRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: queue_pb.RemoveSongResponse|null) => void
  ): UnaryResponse;
  removeSong(
    requestMessage: queue_pb.RemoveSongRequest,
    callback: (error: ServiceError|null, responseMessage: queue_pb.RemoveSongResponse|null) => void
  ): UnaryResponse;
  skipSong(
    requestMessage: queue_pb.SkipSongRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: queue_pb.SkipSongResponse|null) => void
  ): UnaryResponse;
  skipSong(
    requestMessage: queue_pb.SkipSongRequest,
    callback: (error: ServiceError|null, responseMessage: queue_pb.SkipSongResponse|null) => void
  ): UnaryResponse;
  repeatSong(
    requestMessage: queue_pb.RepeatSongRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: queue_pb.RepeatSongResponse|null) => void
  ): UnaryResponse;
  repeatSong(
    requestMessage: queue_pb.RepeatSongRequest,
    callback: (error: ServiceError|null, responseMessage: queue_pb.RepeatSongResponse|null) => void
  ): UnaryResponse;
  shuffleQueue(
    requestMessage: queue_pb.ShuffleQueueRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: queue_pb.ShuffleQueueResponse|null) => void
  ): UnaryResponse;
  shuffleQueue(
    requestMessage: queue_pb.ShuffleQueueRequest,
    callback: (error: ServiceError|null, responseMessage: queue_pb.ShuffleQueueResponse|null) => void
  ): UnaryResponse;
  changeSongPosition(
    requestMessage: queue_pb.ChangeSongPositionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: queue_pb.ChangeSongPositionResponse|null) => void
  ): UnaryResponse;
  changeSongPosition(
    requestMessage: queue_pb.ChangeSongPositionRequest,
    callback: (error: ServiceError|null, responseMessage: queue_pb.ChangeSongPositionResponse|null) => void
  ): UnaryResponse;
  timeStamp(requestMessage: queue_pb.TimeStampRequest, metadata?: grpc.Metadata): ResponseStream<queue_pb.TimeStampResponse>;
}

