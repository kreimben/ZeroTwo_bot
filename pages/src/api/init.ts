import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport";

// @ts-ignore
const host = import.meta.env.VITE_GRPC_HOST;
const transport = new GrpcWebFetchTransport({baseUrl: host})
export {host, transport}