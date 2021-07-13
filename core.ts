/* jshint esversion: 6 */
import { req } from "./request";
import { IRequestOptions } from "./interfaces";

const apiPath: string = "api.boticord.top";
const internalApiPath: string = "boticord.top";

function options({
  token,
  uri,
  method = "GET",
  data = null,
  type = "json",
  isInternalAPI = false,
  detailedData,
}) {
  let optionsData: IRequestOptions = {
    hostname: isInternalAPI ? internalApiPath : apiPath,
    port: 443,
    path: isInternalAPI ? uri : `/v1${uri}`,
    headers: { Authorization: token },
    method,
    type,
    detailedData,
  };

  if (data !== null) optionsData.body = data;

  return optionsData;
}

export class BotiCord {
  api_token: string;
  detailed_data: boolean;
  constructor({ token, detailedData = false }) {
    if (!token) throw new ReferenceError("token not provided");
    this.api_token = token;
    this.detailed_data = detailedData;
  }

  searchBot(term: string) {
    return new Promise((resolve, reject) =>
      req(
        options({
          token: this.api_token,
          uri: "/search",
          method: "POST",
          data: { term },
          type: "urlencoded",
          isInternalAPI: true,
          detailedData: this.detailed_data,
        })
      ).then(resolve, reject)
    );
  }

  getBot(botData: string) {
    return new Promise((resolve, reject) =>
      req(
        options({
          token: this.api_token,
          uri: `/bot/${botData}`,
          method: "GET",
          type: "json",
          isInternalAPI: false,
          detailedData: this.detailed_data,
        })
      ).then(resolve, reject)
    );
  }

  getBotComments(botID: string, limit: number = 10) {
    return new Promise((resolve, reject) =>
      req(
        options({
          token: this.api_token,
          uri: `/bot/${botID}/comments?limit=${limit}`,
          method: "GET",
          type: "json",
          isInternalAPI: false,
          detailedData: this.detailed_data,
        })
      ).then(resolve, reject)
    );
  }

  getUser(userID: string) {
    return new Promise((resolve, reject) =>
      req(
        options({
          token: this.api_token,
          uri: `/profile/${userID}`,
          method: "GET",
          type: "json",
          isInternalAPI: false,
          detailedData: this.detailed_data,
        })
      ).then(resolve, reject)
    );
  }

  getUserBots(userID: string) {
    return new Promise((resolve, reject) =>
      req(
        options({
          token: this.api_token,
          uri: `/bots/${userID}`,
          method: "GET",
          type: "json",
          isInternalAPI: false,
          detailedData: this.detailed_data,
        })
      ).then(resolve, reject)
    );
  }

  sendBotStats({ servers = 0, shards = 0, users = 0 }) {
    return new Promise((resolve, reject) =>
      req(
        options({
          token: this.api_token,
          uri: "/api/stats",
          method: "POST",
          type: "json",
          data: { servers, shards, users },
          isInternalAPI: true,
          detailedData: this.detailed_data,
        })
      ).then(resolve, reject)
    );
  }

  sendServerStats({
    serverID,
    up,
    status,
    serverName = null,
    serverAvatar = null,
    serverMembersAllCount = 0,
    serverMembersOnlineCount = 0,
    serverOwnerID = null,
  }) {
    if(!serverID || !up || !status) throw new ReferenceError("args not provided");
    return new Promise((resolve, reject) =>
      req(
        options({
          token: this.api_token,
          uri: "/server",
          method: "POST",
          type: "json",
          data: {
            serverID,
            up,
            status,
            serverName,
            serverAvatar,
            serverMembersAllCount,
            serverMembersOnlineCount,
            serverOwnerID,
          },
          isInternalAPI: false,
          detailedData: this.detailed_data,
        })
      ).then(resolve, reject)
    );
  }
}
