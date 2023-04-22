// package: queue
// file: queue.proto

var queue_pb = require("./queue_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var QueueService = (function () {
  function QueueService() {}
  QueueService.serviceName = "queue.QueueService";
  return QueueService;
}());

QueueService.CurrentQueue = {
  methodName: "CurrentQueue",
  service: QueueService,
  requestStream: false,
  responseStream: false,
  requestType: queue_pb.CurrentQueueRequest,
  responseType: queue_pb.CurrentQueueResponse
};

QueueService.RemoveSong = {
  methodName: "RemoveSong",
  service: QueueService,
  requestStream: false,
  responseStream: false,
  requestType: queue_pb.RemoveSongRequest,
  responseType: queue_pb.RemoveSongResponse
};

QueueService.SkipSong = {
  methodName: "SkipSong",
  service: QueueService,
  requestStream: false,
  responseStream: false,
  requestType: queue_pb.SkipSongRequest,
  responseType: queue_pb.SkipSongResponse
};

QueueService.RepeatSong = {
  methodName: "RepeatSong",
  service: QueueService,
  requestStream: false,
  responseStream: false,
  requestType: queue_pb.RepeatSongRequest,
  responseType: queue_pb.RepeatSongResponse
};

QueueService.ShuffleQueue = {
  methodName: "ShuffleQueue",
  service: QueueService,
  requestStream: false,
  responseStream: false,
  requestType: queue_pb.ShuffleQueueRequest,
  responseType: queue_pb.ShuffleQueueResponse
};

QueueService.ChangeSongPosition = {
  methodName: "ChangeSongPosition",
  service: QueueService,
  requestStream: false,
  responseStream: false,
  requestType: queue_pb.ChangeSongPositionRequest,
  responseType: queue_pb.ChangeSongPositionResponse
};

QueueService.TimeStamp = {
  methodName: "TimeStamp",
  service: QueueService,
  requestStream: false,
  responseStream: true,
  requestType: queue_pb.TimeStampRequest,
  responseType: queue_pb.TimeStampResponse
};

exports.QueueService = QueueService;

function QueueServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

QueueServiceClient.prototype.currentQueue = function currentQueue(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QueueService.CurrentQueue, {
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

QueueServiceClient.prototype.removeSong = function removeSong(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QueueService.RemoveSong, {
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

QueueServiceClient.prototype.skipSong = function skipSong(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QueueService.SkipSong, {
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

QueueServiceClient.prototype.repeatSong = function repeatSong(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QueueService.RepeatSong, {
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

QueueServiceClient.prototype.shuffleQueue = function shuffleQueue(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QueueService.ShuffleQueue, {
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

QueueServiceClient.prototype.changeSongPosition = function changeSongPosition(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QueueService.ChangeSongPosition, {
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

QueueServiceClient.prototype.timeStamp = function timeStamp(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(QueueService.TimeStamp, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.QueueServiceClient = QueueServiceClient;

