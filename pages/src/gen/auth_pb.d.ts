import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class GetOAuthUrlResponse extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): GetOAuthUrlResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOAuthUrlResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOAuthUrlResponse): GetOAuthUrlResponse.AsObject;
  static serializeBinaryToWriter(message: GetOAuthUrlResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOAuthUrlResponse;
  static deserializeBinaryFromReader(message: GetOAuthUrlResponse, reader: jspb.BinaryReader): GetOAuthUrlResponse;
}

export namespace GetOAuthUrlResponse {
  export type AsObject = {
    url: string,
  }
}

export class LoginWithDiscordRequest extends jspb.Message {
  getCode(): string;
  setCode(value: string): LoginWithDiscordRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginWithDiscordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginWithDiscordRequest): LoginWithDiscordRequest.AsObject;
  static serializeBinaryToWriter(message: LoginWithDiscordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginWithDiscordRequest;
  static deserializeBinaryFromReader(message: LoginWithDiscordRequest, reader: jspb.BinaryReader): LoginWithDiscordRequest;
}

export namespace LoginWithDiscordRequest {
  export type AsObject = {
    code: string,
  }
}

export class LoginWithDiscordResponse extends jspb.Message {
  getAccessToken(): DiscordAccessTokenResponse | undefined;
  setAccessToken(value?: DiscordAccessTokenResponse): LoginWithDiscordResponse;
  hasAccessToken(): boolean;
  clearAccessToken(): LoginWithDiscordResponse;

  getError(): DiscordErrorResponse | undefined;
  setError(value?: DiscordErrorResponse): LoginWithDiscordResponse;
  hasError(): boolean;
  clearError(): LoginWithDiscordResponse;

  getResponseCase(): LoginWithDiscordResponse.ResponseCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginWithDiscordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginWithDiscordResponse): LoginWithDiscordResponse.AsObject;
  static serializeBinaryToWriter(message: LoginWithDiscordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginWithDiscordResponse;
  static deserializeBinaryFromReader(message: LoginWithDiscordResponse, reader: jspb.BinaryReader): LoginWithDiscordResponse;
}

export namespace LoginWithDiscordResponse {
  export type AsObject = {
    accessToken?: DiscordAccessTokenResponse.AsObject,
    error?: DiscordErrorResponse.AsObject,
  }

  export enum ResponseCase { 
    RESPONSE_NOT_SET = 0,
    ACCESS_TOKEN = 1,
    ERROR = 2,
  }
}

export class DiscordErrorResponse extends jspb.Message {
  getError(): string;
  setError(value: string): DiscordErrorResponse;

  getErrorDescription(): string;
  setErrorDescription(value: string): DiscordErrorResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiscordErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DiscordErrorResponse): DiscordErrorResponse.AsObject;
  static serializeBinaryToWriter(message: DiscordErrorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DiscordErrorResponse;
  static deserializeBinaryFromReader(message: DiscordErrorResponse, reader: jspb.BinaryReader): DiscordErrorResponse;
}

export namespace DiscordErrorResponse {
  export type AsObject = {
    error: string,
    errorDescription: string,
  }
}

export class DiscordAccessTokenResponse extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): DiscordAccessTokenResponse;

  getRefreshToken(): string;
  setRefreshToken(value: string): DiscordAccessTokenResponse;

  getExpiresIn(): number;
  setExpiresIn(value: number): DiscordAccessTokenResponse;

  getTokenType(): string;
  setTokenType(value: string): DiscordAccessTokenResponse;

  getScope(): string;
  setScope(value: string): DiscordAccessTokenResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiscordAccessTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DiscordAccessTokenResponse): DiscordAccessTokenResponse.AsObject;
  static serializeBinaryToWriter(message: DiscordAccessTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DiscordAccessTokenResponse;
  static deserializeBinaryFromReader(message: DiscordAccessTokenResponse, reader: jspb.BinaryReader): DiscordAccessTokenResponse;
}

export namespace DiscordAccessTokenResponse {
  export type AsObject = {
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    tokenType: string,
    scope: string,
  }
}

export class RefreshAccessTokenRequest extends jspb.Message {
  getRefreshToken(): string;
  setRefreshToken(value: string): RefreshAccessTokenRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RefreshAccessTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RefreshAccessTokenRequest): RefreshAccessTokenRequest.AsObject;
  static serializeBinaryToWriter(message: RefreshAccessTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RefreshAccessTokenRequest;
  static deserializeBinaryFromReader(message: RefreshAccessTokenRequest, reader: jspb.BinaryReader): RefreshAccessTokenRequest;
}

export namespace RefreshAccessTokenRequest {
  export type AsObject = {
    refreshToken: string,
  }
}

export class GetMyInfoRequest extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): GetMyInfoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMyInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMyInfoRequest): GetMyInfoRequest.AsObject;
  static serializeBinaryToWriter(message: GetMyInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMyInfoRequest;
  static deserializeBinaryFromReader(message: GetMyInfoRequest, reader: jspb.BinaryReader): GetMyInfoRequest;
}

export namespace GetMyInfoRequest {
  export type AsObject = {
    accessToken: string,
  }
}

export class GetMyInfoResponse extends jspb.Message {
  getMyInfo(): UserInfo | undefined;
  setMyInfo(value?: UserInfo): GetMyInfoResponse;
  hasMyInfo(): boolean;
  clearMyInfo(): GetMyInfoResponse;

  getError(): DiscordErrorResponse | undefined;
  setError(value?: DiscordErrorResponse): GetMyInfoResponse;
  hasError(): boolean;
  clearError(): GetMyInfoResponse;

  getResponseCase(): GetMyInfoResponse.ResponseCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMyInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMyInfoResponse): GetMyInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetMyInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMyInfoResponse;
  static deserializeBinaryFromReader(message: GetMyInfoResponse, reader: jspb.BinaryReader): GetMyInfoResponse;
}

export namespace GetMyInfoResponse {
  export type AsObject = {
    myInfo?: UserInfo.AsObject,
    error?: DiscordErrorResponse.AsObject,
  }

  export enum ResponseCase { 
    RESPONSE_NOT_SET = 0,
    MY_INFO = 1,
    ERROR = 2,
  }
}

export class UserInfo extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): UserInfo;

  getUserName(): string;
  setUserName(value: string): UserInfo;

  getAvatar(): string;
  setAvatar(value: string): UserInfo;

  getDiscriminator(): string;
  setDiscriminator(value: string): UserInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserInfo.AsObject;
  static toObject(includeInstance: boolean, msg: UserInfo): UserInfo.AsObject;
  static serializeBinaryToWriter(message: UserInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserInfo;
  static deserializeBinaryFromReader(message: UserInfo, reader: jspb.BinaryReader): UserInfo;
}

export namespace UserInfo {
  export type AsObject = {
    userId: string,
    userName: string,
    avatar: string,
    discriminator: string,
  }
}

export class ValidateGuildIdRequest extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): ValidateGuildIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateGuildIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateGuildIdRequest): ValidateGuildIdRequest.AsObject;
  static serializeBinaryToWriter(message: ValidateGuildIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateGuildIdRequest;
  static deserializeBinaryFromReader(message: ValidateGuildIdRequest, reader: jspb.BinaryReader): ValidateGuildIdRequest;
}

export namespace ValidateGuildIdRequest {
  export type AsObject = {
    guildId: string,
  }
}

export class ValidateGuildIdResponse extends jspb.Message {
  getIsValid(): boolean;
  setIsValid(value: boolean): ValidateGuildIdResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateGuildIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateGuildIdResponse): ValidateGuildIdResponse.AsObject;
  static serializeBinaryToWriter(message: ValidateGuildIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateGuildIdResponse;
  static deserializeBinaryFromReader(message: ValidateGuildIdResponse, reader: jspb.BinaryReader): ValidateGuildIdResponse;
}

export namespace ValidateGuildIdResponse {
  export type AsObject = {
    isValid: boolean,
  }
}

export class ValidateUserIdRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): ValidateUserIdRequest;

  getGuildId(): string;
  setGuildId(value: string): ValidateUserIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateUserIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateUserIdRequest): ValidateUserIdRequest.AsObject;
  static serializeBinaryToWriter(message: ValidateUserIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateUserIdRequest;
  static deserializeBinaryFromReader(message: ValidateUserIdRequest, reader: jspb.BinaryReader): ValidateUserIdRequest;
}

export namespace ValidateUserIdRequest {
  export type AsObject = {
    userId: string,
    guildId: string,
  }
}

export class ValidateUserIdResponse extends jspb.Message {
  getIsValid(): boolean;
  setIsValid(value: boolean): ValidateUserIdResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateUserIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateUserIdResponse): ValidateUserIdResponse.AsObject;
  static serializeBinaryToWriter(message: ValidateUserIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateUserIdResponse;
  static deserializeBinaryFromReader(message: ValidateUserIdResponse, reader: jspb.BinaryReader): ValidateUserIdResponse;
}

export namespace ValidateUserIdResponse {
  export type AsObject = {
    isValid: boolean,
  }
}

