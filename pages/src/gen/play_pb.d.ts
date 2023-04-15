// package: play
// file: play.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class PlayRequest extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getPlayUrl(): string;
  setPlayUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PlayRequest): PlayRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PlayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayRequest;
  static deserializeBinaryFromReader(message: PlayRequest, reader: jspb.BinaryReader): PlayRequest;
}

export namespace PlayRequest {
  export type AsObject = {
    guildId: string,
    userId: string,
    playUrl: string,
  }
}

export class PlayResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PlayResponse): PlayResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PlayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayResponse;
  static deserializeBinaryFromReader(message: PlayResponse, reader: jspb.BinaryReader): PlayResponse;
}

export namespace PlayResponse {
  export type AsObject = {
    message: string,
  }
}

export class SearchRequest extends jspb.Message {
  hasKeyword(): boolean;
  clearKeyword(): void;
  getKeyword(): string;
  setKeyword(value: string): void;

  hasUrl(): boolean;
  clearUrl(): void;
  getUrl(): string;
  setUrl(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  getSearchTypeCase(): SearchRequest.SearchTypeCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchRequest): SearchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchRequest;
  static deserializeBinaryFromReader(message: SearchRequest, reader: jspb.BinaryReader): SearchRequest;
}

export namespace SearchRequest {
  export type AsObject = {
    keyword: string,
    url: string,
    amount: number,
  }

  export enum SearchTypeCase {
    SEARCH_TYPE_NOT_SET = 0,
    KEYWORD = 1,
    URL = 2,
  }
}

export class SearchResponse extends jspb.Message {
  clearVideoinfoList(): void;
  getVideoinfoList(): Array<VideoInfo>;
  setVideoinfoList(value: Array<VideoInfo>): void;
  addVideoinfo(value?: VideoInfo, index?: number): VideoInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchResponse): SearchResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchResponse;
  static deserializeBinaryFromReader(message: SearchResponse, reader: jspb.BinaryReader): SearchResponse;
}

export namespace SearchResponse {
  export type AsObject = {
    videoinfoList: Array<VideoInfo.AsObject>,
  }
}

export class VideoInfo extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getThumbnailUrl(): string;
  setThumbnailUrl(value: string): void;

  hasDuration(): boolean;
  clearDuration(): void;
  getDuration(): google_protobuf_duration_pb.Duration | undefined;
  setDuration(value?: google_protobuf_duration_pb.Duration): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoInfo.AsObject;
  static toObject(includeInstance: boolean, msg: VideoInfo): VideoInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoInfo;
  static deserializeBinaryFromReader(message: VideoInfo, reader: jspb.BinaryReader): VideoInfo;
}

export namespace VideoInfo {
  export type AsObject = {
    title: string,
    url: string,
    thumbnailUrl: string,
    duration?: google_protobuf_duration_pb.Duration.AsObject,
  }
}
