// package: discord
// file: auth.proto

import * as jspb from "google-protobuf";

export class GetOAuthUrlRequest extends jspb.Message {
  getRedirectUri(): string;
  setRedirectUri(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOAuthUrlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOAuthUrlRequest): GetOAuthUrlRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetOAuthUrlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOAuthUrlRequest;
  static deserializeBinaryFromReader(message: GetOAuthUrlRequest, reader: jspb.BinaryReader): GetOAuthUrlRequest;
}

export namespace GetOAuthUrlRequest {
  export type AsObject = {
    redirectUri: string,
  }
}

export class GetOAuthUrlResponse extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOAuthUrlResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOAuthUrlResponse): GetOAuthUrlResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  setCode(value: string): void;

  getRedirectUri(): string;
  setRedirectUri(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginWithDiscordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginWithDiscordRequest): LoginWithDiscordRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginWithDiscordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginWithDiscordRequest;
  static deserializeBinaryFromReader(message: LoginWithDiscordRequest, reader: jspb.BinaryReader): LoginWithDiscordRequest;
}

export namespace LoginWithDiscordRequest {
  export type AsObject = {
    code: string,
    redirectUri: string,
  }
}

export class LoginWithDiscordResponse extends jspb.Message {
  hasAccessToken(): boolean;
  clearAccessToken(): void;
  getAccessToken(): DiscordAccessTokenResponse | undefined;
  setAccessToken(value?: DiscordAccessTokenResponse): void;

  hasError(): boolean;
  clearError(): void;
  getError(): DiscordErrorResponse | undefined;
  setError(value?: DiscordErrorResponse): void;

  getResponseCase(): LoginWithDiscordResponse.ResponseCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginWithDiscordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginWithDiscordResponse): LoginWithDiscordResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  setError(value: string): void;

  getErrorDescription(): string;
  setErrorDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiscordErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DiscordErrorResponse): DiscordErrorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  setAccessToken(value: string): void;

  getRefreshToken(): string;
  setRefreshToken(value: string): void;

  getExpiresIn(): number;
  setExpiresIn(value: number): void;

  getTokenType(): string;
  setTokenType(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiscordAccessTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DiscordAccessTokenResponse): DiscordAccessTokenResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  setRefreshToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RefreshAccessTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RefreshAccessTokenRequest): RefreshAccessTokenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  setAccessToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMyInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMyInfoRequest): GetMyInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  hasMyInfo(): boolean;
  clearMyInfo(): void;
  getMyInfo(): UserInfo | undefined;
  setMyInfo(value?: UserInfo): void;

  hasError(): boolean;
  clearError(): void;
  getError(): DiscordErrorResponse | undefined;
  setError(value?: DiscordErrorResponse): void;

  getResponseCase(): GetMyInfoResponse.ResponseCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMyInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMyInfoResponse): GetMyInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  setUserId(value: string): void;

  getUserName(): string;
  setUserName(value: string): void;

  getAvatar(): string;
  setAvatar(value: string): void;

  getDiscriminator(): string;
  setDiscriminator(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserInfo.AsObject;
  static toObject(includeInstance: boolean, msg: UserInfo): UserInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  setGuildId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateGuildIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateGuildIdRequest): ValidateGuildIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  hasGuildInfo(): boolean;
  clearGuildInfo(): void;
  getGuildInfo(): DiscordGuild | undefined;
  setGuildInfo(value?: DiscordGuild): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateGuildIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateGuildIdResponse): ValidateGuildIdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateGuildIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateGuildIdResponse;
  static deserializeBinaryFromReader(message: ValidateGuildIdResponse, reader: jspb.BinaryReader): ValidateGuildIdResponse;
}

export namespace ValidateGuildIdResponse {
  export type AsObject = {
    guildInfo?: DiscordGuild.AsObject,
  }
}

export class DiscordGuild extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): void;

  getGuildName(): string;
  setGuildName(value: string): void;

  getIcon(): string;
  setIcon(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiscordGuild.AsObject;
  static toObject(includeInstance: boolean, msg: DiscordGuild): DiscordGuild.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DiscordGuild, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DiscordGuild;
  static deserializeBinaryFromReader(message: DiscordGuild, reader: jspb.BinaryReader): DiscordGuild;
}

export namespace DiscordGuild {
  export type AsObject = {
    guildId: string,
    guildName: string,
    icon: string,
  }
}

export class ValidateUserIdRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getGuildId(): string;
  setGuildId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateUserIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateUserIdRequest): ValidateUserIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  setIsValid(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateUserIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateUserIdResponse): ValidateUserIdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateUserIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateUserIdResponse;
  static deserializeBinaryFromReader(message: ValidateUserIdResponse, reader: jspb.BinaryReader): ValidateUserIdResponse;
}

export namespace ValidateUserIdResponse {
  export type AsObject = {
    isValid: boolean,
  }
}

