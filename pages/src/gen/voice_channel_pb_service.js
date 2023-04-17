// package: queue
// file: voice_channel.proto

var voice_channel_pb = require("./voice_channel_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var VoiceChannelService = (function () {
  function VoiceChannelService() {}
  VoiceChannelService.serviceName = "queue.VoiceChannelService";
  return VoiceChannelService;
}());

VoiceChannelService.WhereAmI = {
  methodName: "WhereAmI",
  service: VoiceChannelService,
  requestStream: false,
  responseStream: false,
  requestType: voice_channel_pb.WhereAmIRequest,
  responseType: voice_channel_pb.WhereAmIResponse
};

exports.VoiceChannelService = VoiceChannelService;

function VoiceChannelServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VoiceChannelServiceClient.prototype.whereAmI = function whereAmI(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VoiceChannelService.WhereAmI, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.VoiceChannelServiceClient = VoiceChannelServiceClient;

