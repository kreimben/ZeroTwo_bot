/**
 * @fileoverview gRPC-Web generated client stub for play
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.20.3
// source: play.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js')
const proto = {};
proto.play = require('./play_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.play.PlayServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.play.PlayServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.play.SearchRequest,
 *   !proto.play.SearchResponse>}
 */
const methodDescriptor_PlayService_Search = new grpc.web.MethodDescriptor(
  '/play.PlayService/Search',
  grpc.web.MethodType.UNARY,
  proto.play.SearchRequest,
  proto.play.SearchResponse,
  /**
   * @param {!proto.play.SearchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.play.SearchResponse.deserializeBinary
);


/**
 * @param {!proto.play.SearchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.play.SearchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.play.SearchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.play.PlayServiceClient.prototype.search =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/play.PlayService/Search',
      request,
      metadata || {},
      methodDescriptor_PlayService_Search,
      callback);
};


/**
 * @param {!proto.play.SearchRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.play.SearchResponse>}
 *     Promise that resolves to the response
 */
proto.play.PlayServicePromiseClient.prototype.search =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/play.PlayService/Search',
      request,
      metadata || {},
      methodDescriptor_PlayService_Search);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.play.PlayRequest,
 *   !proto.play.PlayResponse>}
 */
const methodDescriptor_PlayService_Play = new grpc.web.MethodDescriptor(
  '/play.PlayService/Play',
  grpc.web.MethodType.UNARY,
  proto.play.PlayRequest,
  proto.play.PlayResponse,
  /**
   * @param {!proto.play.PlayRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.play.PlayResponse.deserializeBinary
);


/**
 * @param {!proto.play.PlayRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.play.PlayResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.play.PlayResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.play.PlayServiceClient.prototype.play =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/play.PlayService/Play',
      request,
      metadata || {},
      methodDescriptor_PlayService_Play,
      callback);
};


/**
 * @param {!proto.play.PlayRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.play.PlayResponse>}
 *     Promise that resolves to the response
 */
proto.play.PlayServicePromiseClient.prototype.play =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/play.PlayService/Play',
      request,
      metadata || {},
      methodDescriptor_PlayService_Play);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.play.PauseRequest,
 *   !proto.play.PauseResponse>}
 */
const methodDescriptor_PlayService_Pause = new grpc.web.MethodDescriptor(
  '/play.PlayService/Pause',
  grpc.web.MethodType.UNARY,
  proto.play.PauseRequest,
  proto.play.PauseResponse,
  /**
   * @param {!proto.play.PauseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.play.PauseResponse.deserializeBinary
);


/**
 * @param {!proto.play.PauseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.play.PauseResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.play.PauseResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.play.PlayServiceClient.prototype.pause =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/play.PlayService/Pause',
      request,
      metadata || {},
      methodDescriptor_PlayService_Pause,
      callback);
};


/**
 * @param {!proto.play.PauseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.play.PauseResponse>}
 *     Promise that resolves to the response
 */
proto.play.PlayServicePromiseClient.prototype.pause =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/play.PlayService/Pause',
      request,
      metadata || {},
      methodDescriptor_PlayService_Pause);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.play.ResumeRequest,
 *   !proto.play.ResumeResponse>}
 */
const methodDescriptor_PlayService_Resume = new grpc.web.MethodDescriptor(
  '/play.PlayService/Resume',
  grpc.web.MethodType.UNARY,
  proto.play.ResumeRequest,
  proto.play.ResumeResponse,
  /**
   * @param {!proto.play.ResumeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.play.ResumeResponse.deserializeBinary
);


/**
 * @param {!proto.play.ResumeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.play.ResumeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.play.ResumeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.play.PlayServiceClient.prototype.resume =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/play.PlayService/Resume',
      request,
      metadata || {},
      methodDescriptor_PlayService_Resume,
      callback);
};


/**
 * @param {!proto.play.ResumeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.play.ResumeResponse>}
 *     Promise that resolves to the response
 */
proto.play.PlayServicePromiseClient.prototype.resume =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/play.PlayService/Resume',
      request,
      metadata || {},
      methodDescriptor_PlayService_Resume);
};


module.exports = proto.play;

