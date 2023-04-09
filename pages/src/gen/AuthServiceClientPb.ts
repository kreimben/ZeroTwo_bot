/**
 * @fileoverview gRPC-Web generated client stub for discord
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.20.3
// source: auth.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as auth_pb from './auth_pb.d.ts';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class DiscordClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGetOAuthUrl = new grpcWeb.MethodDescriptor(
    '/discord.Discord/GetOAuthUrl',
    grpcWeb.MethodType.UNARY,
    google_protobuf_empty_pb.Empty,
    auth_pb.GetOAuthUrlResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    auth_pb.GetOAuthUrlResponse.deserializeBinary
  );

  getOAuthUrl(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.GetOAuthUrlResponse>;

  getOAuthUrl(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: auth_pb.GetOAuthUrlResponse) => void): grpcWeb.ClientReadableStream<auth_pb.GetOAuthUrlResponse>;

  getOAuthUrl(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: auth_pb.GetOAuthUrlResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/discord.Discord/GetOAuthUrl',
        request,
        metadata || {},
        this.methodDescriptorGetOAuthUrl,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/discord.Discord/GetOAuthUrl',
    request,
    metadata || {},
    this.methodDescriptorGetOAuthUrl);
  }

  methodDescriptorLoginWithDiscord = new grpcWeb.MethodDescriptor(
    '/discord.Discord/LoginWithDiscord',
    grpcWeb.MethodType.UNARY,
    auth_pb.LoginWithDiscordRequest,
    auth_pb.LoginWithDiscordResponse,
    (request: auth_pb.LoginWithDiscordRequest) => {
      return request.serializeBinary();
    },
    auth_pb.LoginWithDiscordResponse.deserializeBinary
  );

  loginWithDiscord(
    request: auth_pb.LoginWithDiscordRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.LoginWithDiscordResponse>;

  loginWithDiscord(
    request: auth_pb.LoginWithDiscordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: auth_pb.LoginWithDiscordResponse) => void): grpcWeb.ClientReadableStream<auth_pb.LoginWithDiscordResponse>;

  loginWithDiscord(
    request: auth_pb.LoginWithDiscordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: auth_pb.LoginWithDiscordResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/discord.Discord/LoginWithDiscord',
        request,
        metadata || {},
        this.methodDescriptorLoginWithDiscord,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/discord.Discord/LoginWithDiscord',
    request,
    metadata || {},
    this.methodDescriptorLoginWithDiscord);
  }

  methodDescriptorRefreshAccessToken = new grpcWeb.MethodDescriptor(
    '/discord.Discord/RefreshAccessToken',
    grpcWeb.MethodType.UNARY,
    auth_pb.RefreshAccessTokenRequest,
    auth_pb.LoginWithDiscordResponse,
    (request: auth_pb.RefreshAccessTokenRequest) => {
      return request.serializeBinary();
    },
    auth_pb.LoginWithDiscordResponse.deserializeBinary
  );

  refreshAccessToken(
    request: auth_pb.RefreshAccessTokenRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.LoginWithDiscordResponse>;

  refreshAccessToken(
    request: auth_pb.RefreshAccessTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: auth_pb.LoginWithDiscordResponse) => void): grpcWeb.ClientReadableStream<auth_pb.LoginWithDiscordResponse>;

  refreshAccessToken(
    request: auth_pb.RefreshAccessTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: auth_pb.LoginWithDiscordResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/discord.Discord/RefreshAccessToken',
        request,
        metadata || {},
        this.methodDescriptorRefreshAccessToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/discord.Discord/RefreshAccessToken',
    request,
    metadata || {},
    this.methodDescriptorRefreshAccessToken);
  }

  methodDescriptorGetMyInfo = new grpcWeb.MethodDescriptor(
    '/discord.Discord/GetMyInfo',
    grpcWeb.MethodType.UNARY,
    auth_pb.GetMyInfoRequest,
    auth_pb.GetMyInfoResponse,
    (request: auth_pb.GetMyInfoRequest) => {
      return request.serializeBinary();
    },
    auth_pb.GetMyInfoResponse.deserializeBinary
  );

  getMyInfo(
    request: auth_pb.GetMyInfoRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.GetMyInfoResponse>;

  getMyInfo(
    request: auth_pb.GetMyInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: auth_pb.GetMyInfoResponse) => void): grpcWeb.ClientReadableStream<auth_pb.GetMyInfoResponse>;

  getMyInfo(
    request: auth_pb.GetMyInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: auth_pb.GetMyInfoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/discord.Discord/GetMyInfo',
        request,
        metadata || {},
        this.methodDescriptorGetMyInfo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/discord.Discord/GetMyInfo',
    request,
    metadata || {},
    this.methodDescriptorGetMyInfo);
  }

  methodDescriptorValidateGuildId = new grpcWeb.MethodDescriptor(
    '/discord.Discord/ValidateGuildId',
    grpcWeb.MethodType.UNARY,
    auth_pb.ValidateGuildIdRequest,
    auth_pb.ValidateGuildIdResponse,
    (request: auth_pb.ValidateGuildIdRequest) => {
      return request.serializeBinary();
    },
    auth_pb.ValidateGuildIdResponse.deserializeBinary
  );

  validateGuildId(
    request: auth_pb.ValidateGuildIdRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.ValidateGuildIdResponse>;

  validateGuildId(
    request: auth_pb.ValidateGuildIdRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: auth_pb.ValidateGuildIdResponse) => void): grpcWeb.ClientReadableStream<auth_pb.ValidateGuildIdResponse>;

  validateGuildId(
    request: auth_pb.ValidateGuildIdRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: auth_pb.ValidateGuildIdResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/discord.Discord/ValidateGuildId',
        request,
        metadata || {},
        this.methodDescriptorValidateGuildId,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/discord.Discord/ValidateGuildId',
    request,
    metadata || {},
    this.methodDescriptorValidateGuildId);
  }

  methodDescriptorValidateUserId = new grpcWeb.MethodDescriptor(
    '/discord.Discord/ValidateUserId',
    grpcWeb.MethodType.UNARY,
    auth_pb.ValidateUserIdRequest,
    auth_pb.ValidateUserIdResponse,
    (request: auth_pb.ValidateUserIdRequest) => {
      return request.serializeBinary();
    },
    auth_pb.ValidateUserIdResponse.deserializeBinary
  );

  validateUserId(
    request: auth_pb.ValidateUserIdRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.ValidateUserIdResponse>;

  validateUserId(
    request: auth_pb.ValidateUserIdRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: auth_pb.ValidateUserIdResponse) => void): grpcWeb.ClientReadableStream<auth_pb.ValidateUserIdResponse>;

  validateUserId(
    request: auth_pb.ValidateUserIdRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: auth_pb.ValidateUserIdResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/discord.Discord/ValidateUserId',
        request,
        metadata || {},
        this.methodDescriptorValidateUserId,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/discord.Discord/ValidateUserId',
    request,
    metadata || {},
    this.methodDescriptorValidateUserId);
  }

}

