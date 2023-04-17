// package: queue
// file: voice_channel.proto

import * as voice_channel_pb from "./voice_channel_pb";
import {grpc} from "@improbable-eng/grpc-web";

type VoiceChannelServiceWhereAmI = {
  readonly methodName: string;
  readonly service: typeof VoiceChannelService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof voice_channel_pb.WhereAmIRequest;
  readonly responseType: typeof voice_channel_pb.WhereAmIResponse;
};

export class VoiceChannelService {
  static readonly serviceName: string;
  static readonly WhereAmI: VoiceChannelServiceWhereAmI;
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

export class VoiceChannelServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  whereAmI(
    requestMessage: voice_channel_pb.WhereAmIRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: voice_channel_pb.WhereAmIResponse|null) => void
  ): UnaryResponse;
  whereAmI(
    requestMessage: voice_channel_pb.WhereAmIRequest,
    callback: (error: ServiceError|null, responseMessage: voice_channel_pb.WhereAmIResponse|null) => void
  ): UnaryResponse;
}

