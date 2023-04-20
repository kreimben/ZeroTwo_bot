// package: play
// file: play.proto

import * as play_pb from "./play_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PlayServiceSearch = {
  readonly methodName: string;
  readonly service: typeof PlayService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof play_pb.SearchRequest;
  readonly responseType: typeof play_pb.SearchResponse;
};

type PlayServicePlay = {
  readonly methodName: string;
  readonly service: typeof PlayService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof play_pb.PlayRequest;
  readonly responseType: typeof play_pb.PlayResponse;
};

type PlayServicePause = {
  readonly methodName: string;
  readonly service: typeof PlayService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof play_pb.PauseRequest;
  readonly responseType: typeof play_pb.PauseResponse;
};

type PlayServiceResume = {
  readonly methodName: string;
  readonly service: typeof PlayService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof play_pb.ResumeRequest;
  readonly responseType: typeof play_pb.ResumeResponse;
};

export class PlayService {
  static readonly serviceName: string;
  static readonly Search: PlayServiceSearch;
  static readonly Play: PlayServicePlay;
  static readonly Pause: PlayServicePause;
  static readonly Resume: PlayServiceResume;
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

export class PlayServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  search(
    requestMessage: play_pb.SearchRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: play_pb.SearchResponse|null) => void
  ): UnaryResponse;
  search(
    requestMessage: play_pb.SearchRequest,
    callback: (error: ServiceError|null, responseMessage: play_pb.SearchResponse|null) => void
  ): UnaryResponse;
  play(
    requestMessage: play_pb.PlayRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: play_pb.PlayResponse|null) => void
  ): UnaryResponse;
  play(
    requestMessage: play_pb.PlayRequest,
    callback: (error: ServiceError|null, responseMessage: play_pb.PlayResponse|null) => void
  ): UnaryResponse;
  pause(
    requestMessage: play_pb.PauseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: play_pb.PauseResponse|null) => void
  ): UnaryResponse;
  pause(
    requestMessage: play_pb.PauseRequest,
    callback: (error: ServiceError|null, responseMessage: play_pb.PauseResponse|null) => void
  ): UnaryResponse;
  resume(
    requestMessage: play_pb.ResumeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: play_pb.ResumeResponse|null) => void
  ): UnaryResponse;
  resume(
    requestMessage: play_pb.ResumeRequest,
    callback: (error: ServiceError|null, responseMessage: play_pb.ResumeResponse|null) => void
  ): UnaryResponse;
}

