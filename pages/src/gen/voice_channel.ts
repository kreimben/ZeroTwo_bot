// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "voice_channel.proto" (package "queue", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message queue.WhereAmIRequest
 */
export interface WhereAmIRequest {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    userId: string;
    /**
     * @generated from protobuf field: string guild_id = 2;
     */
    guildId: string;
}
/**
 * @generated from protobuf message queue.WhereAmIResponse
 */
export interface WhereAmIResponse {
    /**
     * @generated from protobuf oneof: response
     */
    response: {
        oneofKind: "channel";
        /**
         * @generated from protobuf field: queue.ChannelInfo channel = 1;
         */
        channel: ChannelInfo;
    } | {
        oneofKind: "errorMessage";
        /**
         * @generated from protobuf field: string error_message = 2;
         */
        errorMessage: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message queue.ChannelInfo
 */
export interface ChannelInfo {
    /**
     * @generated from protobuf field: string channel_id = 1;
     */
    channelId: string;
    /**
     * @generated from protobuf field: string channel_name = 2;
     */
    channelName: string;
    /**
     * @generated from protobuf field: uint64 bitrate = 3;
     */
    bitrate: bigint;
    /**
     * @generated from protobuf field: repeated queue.MemberInfo members = 4;
     */
    members: MemberInfo[]; // Who is in the channel.
}
/**
 *
 * MemberInfo is the information about a member in a voice channel.
 * Should composite multiple responses from the Discord API.
 *
 * @generated from protobuf message queue.MemberInfo
 */
export interface MemberInfo {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    userId: string;
    /**
     * @generated from protobuf field: string user_name = 2;
     */
    userName: string;
    /**
     * @generated from protobuf field: string user_avatar = 3;
     */
    userAvatar: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class WhereAmIRequest$Type extends MessageType<WhereAmIRequest> {
    constructor() {
        super("queue.WhereAmIRequest", [
            { no: 1, name: "user_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "guild_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<WhereAmIRequest>): WhereAmIRequest {
        const message = { userId: "", guildId: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<WhereAmIRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: WhereAmIRequest): WhereAmIRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string user_id */ 1:
                    message.userId = reader.string();
                    break;
                case /* string guild_id */ 2:
                    message.guildId = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: WhereAmIRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string user_id = 1; */
        if (message.userId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.userId);
        /* string guild_id = 2; */
        if (message.guildId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.guildId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message queue.WhereAmIRequest
 */
export const WhereAmIRequest = new WhereAmIRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class WhereAmIResponse$Type extends MessageType<WhereAmIResponse> {
    constructor() {
        super("queue.WhereAmIResponse", [
            { no: 1, name: "channel", kind: "message", oneof: "response", T: () => ChannelInfo },
            { no: 2, name: "error_message", kind: "scalar", oneof: "response", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<WhereAmIResponse>): WhereAmIResponse {
        const message = { response: { oneofKind: undefined } };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<WhereAmIResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: WhereAmIResponse): WhereAmIResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* queue.ChannelInfo channel */ 1:
                    message.response = {
                        oneofKind: "channel",
                        channel: ChannelInfo.internalBinaryRead(reader, reader.uint32(), options, (message.response as any).channel)
                    };
                    break;
                case /* string error_message */ 2:
                    message.response = {
                        oneofKind: "errorMessage",
                        errorMessage: reader.string()
                    };
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: WhereAmIResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* queue.ChannelInfo channel = 1; */
        if (message.response.oneofKind === "channel")
            ChannelInfo.internalBinaryWrite(message.response.channel, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string error_message = 2; */
        if (message.response.oneofKind === "errorMessage")
            writer.tag(2, WireType.LengthDelimited).string(message.response.errorMessage);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message queue.WhereAmIResponse
 */
export const WhereAmIResponse = new WhereAmIResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ChannelInfo$Type extends MessageType<ChannelInfo> {
    constructor() {
        super("queue.ChannelInfo", [
            { no: 1, name: "channel_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "channel_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "bitrate", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 4, name: "members", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => MemberInfo }
        ]);
    }
    create(value?: PartialMessage<ChannelInfo>): ChannelInfo {
        const message = { channelId: "", channelName: "", bitrate: 0n, members: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ChannelInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ChannelInfo): ChannelInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string channel_id */ 1:
                    message.channelId = reader.string();
                    break;
                case /* string channel_name */ 2:
                    message.channelName = reader.string();
                    break;
                case /* uint64 bitrate */ 3:
                    message.bitrate = reader.uint64().toBigInt();
                    break;
                case /* repeated queue.MemberInfo members */ 4:
                    message.members.push(MemberInfo.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ChannelInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string channel_id = 1; */
        if (message.channelId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.channelId);
        /* string channel_name = 2; */
        if (message.channelName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.channelName);
        /* uint64 bitrate = 3; */
        if (message.bitrate !== 0n)
            writer.tag(3, WireType.Varint).uint64(message.bitrate);
        /* repeated queue.MemberInfo members = 4; */
        for (let i = 0; i < message.members.length; i++)
            MemberInfo.internalBinaryWrite(message.members[i], writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message queue.ChannelInfo
 */
export const ChannelInfo = new ChannelInfo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MemberInfo$Type extends MessageType<MemberInfo> {
    constructor() {
        super("queue.MemberInfo", [
            { no: 1, name: "user_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "user_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "user_avatar", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<MemberInfo>): MemberInfo {
        const message = { userId: "", userName: "", userAvatar: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MemberInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MemberInfo): MemberInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string user_id */ 1:
                    message.userId = reader.string();
                    break;
                case /* string user_name */ 2:
                    message.userName = reader.string();
                    break;
                case /* string user_avatar */ 3:
                    message.userAvatar = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MemberInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string user_id = 1; */
        if (message.userId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.userId);
        /* string user_name = 2; */
        if (message.userName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.userName);
        /* string user_avatar = 3; */
        if (message.userAvatar !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.userAvatar);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message queue.MemberInfo
 */
export const MemberInfo = new MemberInfo$Type();
/**
 * @generated ServiceType for protobuf service queue.VoiceChannelService
 */
export const VoiceChannelService = new ServiceType("queue.VoiceChannelService", [
    { name: "WhereAmI", serverStreaming: true, options: {}, I: WhereAmIRequest, O: WhereAmIResponse }
]);