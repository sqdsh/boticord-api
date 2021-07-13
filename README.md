# boticord-api
A BotiCord API Wrapper [Public API v1]

## Install (git required)
```bash
$ npm install github:sqdsh/boticord-api
# or..
$ yarn add github:sqdsh/boticord-api
```

## Using [Node.js]
```ts
const { BotiCord } = require("boticord-api");
const client = new BotiCord({
  token: "API_TOKEN",
  detailedData: false,
});

client.getBot("sonata").then((bot) => {
  console.log(bot);
});

```

## Using [TypeScript]
```ts
import { BotiCord } from "boticord-api/core.ts";
import { IBot } from "boticord-api/interfaces.ts";

const client = new BotiCord({
  token: "API_TOKEN",
  detailedData: false,
});

client.getBot("sonata").then((bot: IBot) => {
  console.log(bot);
});

```

## All methods
* `searchBot` - `term` required
* `getBot` - `botData` (botID || shortCode) required
* `getBotComments` - `botID` required
* `getUser` - `userID` required
* `getUserBots` - `userID` required
* `sendBotStats` - `{ servers, shards, users }` required
* `sendServerStats` - `{ serverID, up, status }` required

## [for TypeScript] Interfaces
Located in [`interfaces.ts`](https://github.com/sqdsh/boticord-api/blob/master/interfaces.ts)