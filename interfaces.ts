/* jshint esversion: 6 */

export interface IRequestOptions {
  hostname: string;
  port: number;
  path: string;
  method: string;
  body?: object;
  headers: object;
  type: string;
  detailedData: boolean;
}

export interface IBotFromSearch {
  badge: string;
  botID: string;
  customizeCard: number;
  description: string;
  donate: number;
  imageURL: string;
  tags: string[];
  fb: {
    username: string;
    avatar: string;
    status: string;
  };
}

export interface IBot {
  id: string;
  shortCode: string;
  links: string[];
  information: {
    bumps: number;
    added: number;
    prefix: string;
    permissions: number;
    tags: string[];
    developers: string[];
    links: { discord: string; github: string; site: string };
    library: string;
    shortDescription: string;
    badge: string;
    stats: { servers: number; shards: number; users: number };
    status: string;
  };
}

export interface IBotComment {
  userID: string;
  text: string;
  vote: number;
  isUpdated: boolean;
  createdAt: number;
}

export interface IUserProfile {
  id: string;
  status: string;
  badge: string;
  shortCode: string;
  site: string;
  vk: string;
  steam: string;
  youtube: string;
  twitch: string;
  git: string;
}

export interface IUserBots {
  id: string;
  shortCode: string;
}

export interface IBotStats {
  ok: boolean;
}

export interface IServerStats {
  serverID: string;
  up: number;
  updated: boolean;
  message: string;
  timeToNextUpInMs: number;
}
