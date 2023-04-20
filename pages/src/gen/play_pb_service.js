// package: play
// file: play.proto

var play_pb = require("./play_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PlayService = (function () {
  function PlayService() {}
  PlayService.serviceName = "play.PlayService";
  return PlayService;
}());

PlayService.Search = {
  methodName: "Search",
  service: PlayService,
  requestStream: false,
  responseStream: false,
  requestType: play_pb.SearchRequest,
  responseType: play_pb.SearchResponse
};

PlayService.Play = {
  methodName: "Play",
  service: PlayService,
  requestStream: false,
  responseStream: false,
  requestType: play_pb.PlayRequest,
  responseType: play_pb.PlayResponse
};

PlayService.Pause = {
  methodName: "Pause",
  service: PlayService,
  requestStream: false,
  responseStream: false,
  requestType: play_pb.PauseRequest,
  responseType: play_pb.PauseResponse
};

PlayService.Resume = {
  methodName: "Resume",
  service: PlayService,
  requestStream: false,
  responseStream: false,
  requestType: play_pb.ResumeRequest,
  responseType: play_pb.ResumeResponse
};

exports.PlayService = PlayService;

function PlayServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PlayServiceClient.prototype.search = function search(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PlayService.Search, {
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

PlayServiceClient.prototype.play = function play(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PlayService.Play, {
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

PlayServiceClient.prototype.pause = function pause(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PlayService.Pause, {
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

PlayServiceClient.prototype.resume = function resume(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PlayService.Resume, {
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

exports.PlayServiceClient = PlayServiceClient;

