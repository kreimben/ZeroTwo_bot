// package: discord
// file: auth.proto

var auth_pb = require("./auth_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Discord = (function () {
  function Discord() {}
  Discord.serviceName = "discord.Discord";
  return Discord;
}());

Discord.GetOAuthUrl = {
  methodName: "GetOAuthUrl",
  service: Discord,
  requestStream: false,
  responseStream: false,
  requestType: auth_pb.GetOAuthUrlRequest,
  responseType: auth_pb.GetOAuthUrlResponse
};

Discord.LoginWithDiscord = {
  methodName: "LoginWithDiscord",
  service: Discord,
  requestStream: false,
  responseStream: false,
  requestType: auth_pb.LoginWithDiscordRequest,
  responseType: auth_pb.LoginWithDiscordResponse
};

Discord.RefreshAccessToken = {
  methodName: "RefreshAccessToken",
  service: Discord,
  requestStream: false,
  responseStream: false,
  requestType: auth_pb.RefreshAccessTokenRequest,
  responseType: auth_pb.LoginWithDiscordResponse
};

Discord.GetMyInfo = {
  methodName: "GetMyInfo",
  service: Discord,
  requestStream: false,
  responseStream: false,
  requestType: auth_pb.GetMyInfoRequest,
  responseType: auth_pb.GetMyInfoResponse
};

Discord.ValidateGuildId = {
  methodName: "ValidateGuildId",
  service: Discord,
  requestStream: false,
  responseStream: false,
  requestType: auth_pb.ValidateGuildIdRequest,
  responseType: auth_pb.ValidateGuildIdResponse
};

Discord.ValidateUserId = {
  methodName: "ValidateUserId",
  service: Discord,
  requestStream: false,
  responseStream: false,
  requestType: auth_pb.ValidateUserIdRequest,
  responseType: auth_pb.ValidateUserIdResponse
};

exports.Discord = Discord;

function DiscordClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DiscordClient.prototype.getOAuthUrl = function getOAuthUrl(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Discord.GetOAuthUrl, {
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

DiscordClient.prototype.loginWithDiscord = function loginWithDiscord(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Discord.LoginWithDiscord, {
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

DiscordClient.prototype.refreshAccessToken = function refreshAccessToken(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Discord.RefreshAccessToken, {
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

DiscordClient.prototype.getMyInfo = function getMyInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Discord.GetMyInfo, {
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

DiscordClient.prototype.validateGuildId = function validateGuildId(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Discord.ValidateGuildId, {
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

DiscordClient.prototype.validateUserId = function validateUserId(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Discord.ValidateUserId, {
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

exports.DiscordClient = DiscordClient;

