import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport";

// @ts-ignore
const host = import.meta.env.VITE_GRPC_HOST || 'http://localhost:5012';
const transport = new GrpcWebFetchTransport({baseUrl: host})
export {host, transport}