// package: queue
// file: voice_channel.proto

import * as jspb from "google-protobuf";

export class WhereAmIRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getGuildId(): string;
  setGuildId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WhereAmIRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WhereAmIRequest): WhereAmIRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WhereAmIRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WhereAmIRequest;
  static deserializeBinaryFromReader(message: WhereAmIRequest, reader: jspb.BinaryReader): WhereAmIRequest;
}

export namespace WhereAmIRequest {
  export type AsObject = {
    userId: string,
    guildId: string,
  }
}

export class WhereAmIResponse extends jspb.Message {
  hasChannel(): boolean;
  clearChannel(): void;
  getChannel(): ChannelInfo | undefined;
  setChannel(value?: ChannelInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WhereAmIResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WhereAmIResponse): WhereAmIResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WhereAmIResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WhereAmIResponse;
  static deserializeBinaryFromReader(message: WhereAmIResponse, reader: jspb.BinaryReader): WhereAmIResponse;
}

export namespace WhereAmIResponse {
  export type AsObject = {
    channel?: ChannelInfo.AsObject,
  }
}

export class ChannelInfo extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getChannelName(): string;
  setChannelName(value: string): void;

  getBitrate(): number;
  setBitrate(value: number): void;

  clearMembersList(): void;
  getMembersList(): Array<MemberInfo>;
  setMembersList(value: Array<MemberInfo>): void;
  addMembers(value?: MemberInfo, index?: number): MemberInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelInfo): ChannelInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelInfo;
  static deserializeBinaryFromReader(message: ChannelInfo, reader: jspb.BinaryReader): ChannelInfo;
}

export namespace ChannelInfo {
  export type AsObject = {
    channelId: string,
    channelName: string,
    bitrate: number,
    membersList: Array<MemberInfo.AsObject>,
  }
}

export class MemberInfo extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getUserName(): string;
  setUserName(value: string): void;

  getUserAvatar(): string;
  setUserAvatar(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MemberInfo.AsObject;
  static toObject(includeInstance: boolean, msg: MemberInfo): MemberInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MemberInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MemberInfo;
  static deserializeBinaryFromReader(message: MemberInfo, reader: jspb.BinaryReader): MemberInfo;
}

export namespace MemberInfo {
  export type AsObject = {
    userId: string,
    userName: string,
    userAvatar: string,
  }
}

