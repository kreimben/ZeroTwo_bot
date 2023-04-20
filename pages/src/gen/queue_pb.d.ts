// package: queue
// file: queue.proto

import * as jspb from "google-protobuf";

export class CurrentQueueRequest extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrentQueueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CurrentQueueRequest): CurrentQueueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CurrentQueueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrentQueueRequest;
  static deserializeBinaryFromReader(message: CurrentQueueRequest, reader: jspb.BinaryReader): CurrentQueueRequest;
}

export namespace CurrentQueueRequest {
  export type AsObject = {
    guildId: string,
    userId: string,
  }
}

export class CurrentQueueResponse extends jspb.Message {
  hasCurrentSong(): boolean;
  clearCurrentSong(): void;
  getCurrentSong(): Song | undefined;
  setCurrentSong(value?: Song): void;

  clearSongsList(): void;
  getSongsList(): Array<Song>;
  setSongsList(value: Array<Song>): void;
  addSongs(value?: Song, index?: number): Song;

  getLength(): number;
  setLength(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrentQueueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CurrentQueueResponse): CurrentQueueResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CurrentQueueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrentQueueResponse;
  static deserializeBinaryFromReader(message: CurrentQueueResponse, reader: jspb.BinaryReader): CurrentQueueResponse;
}

export namespace CurrentQueueResponse {
  export type AsObject = {
    currentSong?: Song.AsObject,
    songsList: Array<Song.AsObject>,
    length: number,
    timestamp: number,
  }
}

export class Song extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getThumbnailUrl(): string;
  setThumbnailUrl(value: string): void;

  getDuration(): number;
  setDuration(value: number): void;

  getApplicant(): string;
  setApplicant(value: string): void;

  getPosition(): number;
  setPosition(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Song.AsObject;
  static toObject(includeInstance: boolean, msg: Song): Song.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Song, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Song;
  static deserializeBinaryFromReader(message: Song, reader: jspb.BinaryReader): Song;
}

export namespace Song {
  export type AsObject = {
    title: string,
    url: string,
    thumbnailUrl: string,
    duration: number,
    applicant: string,
    position: number,
  }
}

export class RemoveSongRequest extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getSongIndex(): number;
  setSongIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveSongRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveSongRequest): RemoveSongRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveSongRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveSongRequest;
  static deserializeBinaryFromReader(message: RemoveSongRequest, reader: jspb.BinaryReader): RemoveSongRequest;
}

export namespace RemoveSongRequest {
  export type AsObject = {
    guildId: string,
    userId: string,
    songIndex: number,
  }
}

export class RemoveSongResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveSongResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveSongResponse): RemoveSongResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveSongResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveSongResponse;
  static deserializeBinaryFromReader(message: RemoveSongResponse, reader: jspb.BinaryReader): RemoveSongResponse;
}

export namespace RemoveSongResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class SkipSongRequest extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getSongIndex(): number;
  setSongIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SkipSongRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SkipSongRequest): SkipSongRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SkipSongRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SkipSongRequest;
  static deserializeBinaryFromReader(message: SkipSongRequest, reader: jspb.BinaryReader): SkipSongRequest;
}

export namespace SkipSongRequest {
  export type AsObject = {
    guildId: string,
    userId: string,
    songIndex: number,
  }
}

export class SkipSongResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SkipSongResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SkipSongResponse): SkipSongResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SkipSongResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SkipSongResponse;
  static deserializeBinaryFromReader(message: SkipSongResponse, reader: jspb.BinaryReader): SkipSongResponse;
}

export namespace SkipSongResponse {
  export type AsObject = {
    success: boolean,
  }
}

export class RepeatSongRequest extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepeatSongRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RepeatSongRequest): RepeatSongRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RepeatSongRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepeatSongRequest;
  static deserializeBinaryFromReader(message: RepeatSongRequest, reader: jspb.BinaryReader): RepeatSongRequest;
}

export namespace RepeatSongRequest {
  export type AsObject = {
    guildId: string,
    userId: string,
  }
}

export class RepeatSongResponse extends jspb.Message {
  getResult(): boolean;
  setResult(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepeatSongResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RepeatSongResponse): RepeatSongResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RepeatSongResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepeatSongResponse;
  static deserializeBinaryFromReader(message: RepeatSongResponse, reader: jspb.BinaryReader): RepeatSongResponse;
}

export namespace RepeatSongResponse {
  export type AsObject = {
    result: boolean,
  }
}

export class ShuffleQueueRequest extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ShuffleQueueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ShuffleQueueRequest): ShuffleQueueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ShuffleQueueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ShuffleQueueRequest;
  static deserializeBinaryFromReader(message: ShuffleQueueRequest, reader: jspb.BinaryReader): ShuffleQueueRequest;
}

export namespace ShuffleQueueRequest {
  export type AsObject = {
    guildId: string,
    userId: string,
  }
}

export class ShuffleQueueResponse extends jspb.Message {
  clearSongsList(): void;
  getSongsList(): Array<Song>;
  setSongsList(value: Array<Song>): void;
  addSongs(value?: Song, index?: number): Song;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ShuffleQueueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ShuffleQueueResponse): ShuffleQueueResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ShuffleQueueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ShuffleQueueResponse;
  static deserializeBinaryFromReader(message: ShuffleQueueResponse, reader: jspb.BinaryReader): ShuffleQueueResponse;
}

export namespace ShuffleQueueResponse {
  export type AsObject = {
    songsList: Array<Song.AsObject>,
  }
}

export class ChangeSongPositionRequest extends jspb.Message {
  getGuildId(): string;
  setGuildId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  clearSongPositionsList(): void;
  getSongPositionsList(): Array<number>;
  setSongPositionsList(value: Array<number>): void;
  addSongPositions(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeSongPositionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeSongPositionRequest): ChangeSongPositionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangeSongPositionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeSongPositionRequest;
  static deserializeBinaryFromReader(message: ChangeSongPositionRequest, reader: jspb.BinaryReader): ChangeSongPositionRequest;
}

export namespace ChangeSongPositionRequest {
  export type AsObject = {
    guildId: string,
    userId: string,
    songPositionsList: Array<number>,
  }
}

export class ChangeSongPositionResponse extends jspb.Message {
  clearSongsList(): void;
  getSongsList(): Array<Song>;
  setSongsList(value: Array<Song>): void;
  addSongs(value?: Song, index?: number): Song;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeSongPositionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeSongPositionResponse): ChangeSongPositionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangeSongPositionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeSongPositionResponse;
  static deserializeBinaryFromReader(message: ChangeSongPositionResponse, reader: jspb.BinaryReader): ChangeSongPositionResponse;
}

export namespace ChangeSongPositionResponse {
  export type AsObject = {
    songsList: Array<Song.AsObject>,
  }
}

