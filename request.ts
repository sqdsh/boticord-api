/* jshint esversion: 6 */
import { stringify } from "querystring";
import { request } from "https";

function send(params, postData = null) {
  return new Promise((resolve, reject) => {
    let req = request(params, (res) => {
      let chunks: any = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (chunks += chunk));
      res.once("end", () =>
        params.detailedData
          ? resolve({
              resp: JSON.parse(chunks),
              headers: res.headers,
              respStatus: res.statusMessage,
              respCode: res.statusCode,
            })
          : resolve(JSON.parse(chunks))
      );
    });

    req.on("error", reject);

    if (postData) req.write(postData);
    req.end();
  });
}

export function req(params) {
  params.headers["Content-Type"] =
    params.type === "json"
      ? "application/json"
      : "application/x-www-form-urlencoded";

  if (params.body) {
    let postData: string;
    switch (params.type) {
      case "json":
        postData = JSON.stringify(params.body);
        params.headers["Content-Length"] = Buffer.byteLength(postData);
        break;

      case "urlencoded":
        postData = stringify(params.body);
        params.headers["Content-Length"] = Buffer.byteLength(postData);
        break;
    }

    return send(params, postData);
  }

  return send(params);
}
