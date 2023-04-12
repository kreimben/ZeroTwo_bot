// package: discord
// file: auth.proto

import * as auth_pb from "./auth_pb";
import {grpc} from "@improbable-eng/grpc-web";

type DiscordGetOAuthUrl = {
  readonly methodName: string;
  readonly service: typeof Discord;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof auth_pb.GetOAuthUrlRequest;
  readonly responseType: typeof auth_pb.GetOAuthUrlResponse;
};

type DiscordLoginWithDiscord = {
  readonly methodName: string;
  readonly service: typeof Discord;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof auth_pb.LoginWithDiscordRequest;
  readonly responseType: typeof auth_pb.LoginWithDiscordResponse;
};

type DiscordRefreshAccessToken = {
  readonly methodName: string;
  readonly service: typeof Discord;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof auth_pb.RefreshAccessTokenRequest;
  readonly responseType: typeof auth_pb.LoginWithDiscordResponse;
};

type DiscordGetMyInfo = {
  readonly methodName: string;
  readonly service: typeof Discord;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof auth_pb.GetMyInfoRequest;
  readonly responseType: typeof auth_pb.GetMyInfoResponse;
};

type DiscordValidateGuildId = {
  readonly methodName: string;
  readonly service: typeof Discord;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof auth_pb.ValidateGuildIdRequest;
  readonly responseType: typeof auth_pb.ValidateGuildIdResponse;
};

type DiscordValidateUserId = {
  readonly methodName: string;
  readonly service: typeof Discord;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof auth_pb.ValidateUserIdRequest;
  readonly responseType: typeof auth_pb.ValidateUserIdResponse;
};

export class Discord {
  static readonly serviceName: string;
  static readonly GetOAuthUrl: DiscordGetOAuthUrl;
  static readonly LoginWithDiscord: DiscordLoginWithDiscord;
  static readonly RefreshAccessToken: DiscordRefreshAccessToken;
  static readonly GetMyInfo: DiscordGetMyInfo;
  static readonly ValidateGuildId: DiscordValidateGuildId;
  static readonly ValidateUserId: DiscordValidateUserId;
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

export class DiscordClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getOAuthUrl(
    requestMessage: auth_pb.GetOAuthUrlRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: auth_pb.GetOAuthUrlResponse|null) => void
  ): UnaryResponse;
  getOAuthUrl(
    requestMessage: auth_pb.GetOAuthUrlRequest,
    callback: (error: ServiceError|null, responseMessage: auth_pb.GetOAuthUrlResponse|null) => void
  ): UnaryResponse;
  loginWithDiscord(
    requestMessage: auth_pb.LoginWithDiscordRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: auth_pb.LoginWithDiscordResponse|null) => void
  ): UnaryResponse;
  loginWithDiscord(
    requestMessage: auth_pb.LoginWithDiscordRequest,
    callback: (error: ServiceError|null, responseMessage: auth_pb.LoginWithDiscordResponse|null) => void
  ): UnaryResponse;
  refreshAccessToken(
    requestMessage: auth_pb.RefreshAccessTokenRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: auth_pb.LoginWithDiscordResponse|null) => void
  ): UnaryResponse;
  refreshAccessToken(
    requestMessage: auth_pb.RefreshAccessTokenRequest,
    callback: (error: ServiceError|null, responseMessage: auth_pb.LoginWithDiscordResponse|null) => void
  ): UnaryResponse;
  getMyInfo(
    requestMessage: auth_pb.GetMyInfoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: auth_pb.GetMyInfoResponse|null) => void
  ): UnaryResponse;
  getMyInfo(
    requestMessage: auth_pb.GetMyInfoRequest,
    callback: (error: ServiceError|null, responseMessage: auth_pb.GetMyInfoResponse|null) => void
  ): UnaryResponse;
  validateGuildId(
    requestMessage: auth_pb.ValidateGuildIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: auth_pb.ValidateGuildIdResponse|null) => void
  ): UnaryResponse;
  validateGuildId(
    requestMessage: auth_pb.ValidateGuildIdRequest,
    callback: (error: ServiceError|null, responseMessage: auth_pb.ValidateGuildIdResponse|null) => void
  ): UnaryResponse;
  validateUserId(
    requestMessage: auth_pb.ValidateUserIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: auth_pb.ValidateUserIdResponse|null) => void
  ): UnaryResponse;
  validateUserId(
    requestMessage: auth_pb.ValidateUserIdRequest,
    callback: (error: ServiceError|null, responseMessage: auth_pb.ValidateUserIdResponse|null) => void
  ): UnaryResponse;
}

