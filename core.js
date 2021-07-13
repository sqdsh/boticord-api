"use strict";
exports.__esModule = true;
/* jshint esversion: 6 */
var request_1 = require("./request");
var apiPath = "api.boticord.top";
var internalApiPath = "boticord.top";
function options(_a) {
    var token = _a.token, uri = _a.uri, _b = _a.method, method = _b === void 0 ? "GET" : _b, _c = _a.data, data = _c === void 0 ? null : _c, _d = _a.type, type = _d === void 0 ? "json" : _d, _e = _a.isInternalAPI, isInternalAPI = _e === void 0 ? false : _e, detailedData = _a.detailedData;
    var optionsData = {
        hostname: isInternalAPI ? internalApiPath : apiPath,
        port: 443,
        path: isInternalAPI ? uri : "/v1" + uri,
        headers: { Authorization: token },
        method: method,
        type: type,
        detailedData: detailedData
    };
    if (data !== null)
        optionsData.body = data;
    return optionsData;
}
var BotiCord = /** @class */ (function () {
    function BotiCord(_a) {
        var token = _a.token, _b = _a.detailedData, detailedData = _b === void 0 ? false : _b;
        if (!token)
            throw new ReferenceError("token not provided");
        this.api_token = token;
        this.detailed_data = detailedData;
    }
    BotiCord.prototype.searchBot = function (term) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return request_1.req(options({
                token: _this.api_token,
                uri: "/search",
                method: "POST",
                data: { term: term },
                type: "urlencoded",
                isInternalAPI: true,
                detailedData: _this.detailed_data
            })).then(resolve, reject);
        });
    };
    BotiCord.prototype.getBot = function (botData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return request_1.req(options({
                token: _this.api_token,
                uri: "/bot/" + botData,
                method: "GET",
                type: "json",
                isInternalAPI: false,
                detailedData: _this.detailed_data
            })).then(resolve, reject);
        });
    };
    BotiCord.prototype.getBotComments = function (botID, limit) {
        var _this = this;
        if (limit === void 0) { limit = 10; }
        return new Promise(function (resolve, reject) {
            return request_1.req(options({
                token: _this.api_token,
                uri: "/bot/" + botID + "/comments?limit=" + limit,
                method: "GET",
                type: "json",
                isInternalAPI: false,
                detailedData: _this.detailed_data
            })).then(resolve, reject);
        });
    };
    BotiCord.prototype.getUser = function (userID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return request_1.req(options({
                token: _this.api_token,
                uri: "/profile/" + userID,
                method: "GET",
                type: "json",
                isInternalAPI: false,
                detailedData: _this.detailed_data
            })).then(resolve, reject);
        });
    };
    BotiCord.prototype.getUserBots = function (userID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return request_1.req(options({
                token: _this.api_token,
                uri: "/bots/" + userID,
                method: "GET",
                type: "json",
                isInternalAPI: false,
                detailedData: _this.detailed_data
            })).then(resolve, reject);
        });
    };
    BotiCord.prototype.sendBotStats = function (_a) {
        var _this = this;
        var _b = _a.servers, servers = _b === void 0 ? 0 : _b, _c = _a.shards, shards = _c === void 0 ? 0 : _c, _d = _a.users, users = _d === void 0 ? 0 : _d;
        return new Promise(function (resolve, reject) {
            return request_1.req(options({
                token: _this.api_token,
                uri: "/api/stats",
                method: "POST",
                type: "json",
                data: { servers: servers, shards: shards, users: users },
                isInternalAPI: true,
                detailedData: _this.detailed_data
            })).then(resolve, reject);
        });
    };
    BotiCord.prototype.sendServerStats = function (_a) {
        var _this = this;
        var serverID = _a.serverID, up = _a.up, status = _a.status, _b = _a.serverName, serverName = _b === void 0 ? null : _b, _c = _a.serverAvatar, serverAvatar = _c === void 0 ? null : _c, _d = _a.serverMembersAllCount, serverMembersAllCount = _d === void 0 ? 0 : _d, _e = _a.serverMembersOnlineCount, serverMembersOnlineCount = _e === void 0 ? 0 : _e, _f = _a.serverOwnerID, serverOwnerID = _f === void 0 ? null : _f;
        if (!serverID || !up || !status)
            throw new ReferenceError("args not provided");
        return new Promise(function (resolve, reject) {
            return request_1.req(options({
                token: _this.api_token,
                uri: "/server",
                method: "POST",
                type: "json",
                data: {
                    serverID: serverID,
                    up: up,
                    status: status,
                    serverName: serverName,
                    serverAvatar: serverAvatar,
                    serverMembersAllCount: serverMembersAllCount,
                    serverMembersOnlineCount: serverMembersOnlineCount,
                    serverOwnerID: serverOwnerID
                },
                isInternalAPI: false,
                detailedData: _this.detailed_data
            })).then(resolve, reject);
        });
    };
    return BotiCord;
}());
exports.BotiCord = BotiCord;
