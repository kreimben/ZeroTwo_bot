import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport";

// @ts-ignore
const host = import.meta.env.VITE_GRPC_HOST || 'https://api.zerotwo.kreimben.com';
const transport = new GrpcWebFetchTransport({baseUrl: host})
export {host, transport}