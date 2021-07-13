"use strict";
exports.__esModule = true;
/* jshint esversion: 6 */
var querystring_1 = require("querystring");
var https_1 = require("https");
function send(params, postData) {
    if (postData === void 0) { postData = null; }
    return new Promise(function (resolve, reject) {
        var req = https_1.request(params, function (res) {
            var chunks = "";
            res.setEncoding("utf8");
            res.on("data", function (chunk) { return (chunks += chunk); });
            res.once("end", function () {
                return params.detailedData
                    ? resolve({
                        resp: JSON.parse(chunks),
                        headers: res.headers,
                        respStatus: res.statusMessage,
                        respCode: res.statusCode
                    })
                    : resolve(JSON.parse(chunks));
            });
        });
        req.on("error", reject);
        if (postData)
            req.write(postData);
        req.end();
    });
}
function req(params) {
    params.headers["Content-Type"] =
        params.type === "json"
            ? "application/json"
            : "application/x-www-form-urlencoded";
    if (params.body) {
        var postData = void 0;
        switch (params.type) {
            case "json":
                postData = JSON.stringify(params.body);
                params.headers["Content-Length"] = Buffer.byteLength(postData);
                break;
            case "urlencoded":
                postData = querystring_1.stringify(params.body);
                params.headers["Content-Length"] = Buffer.byteLength(postData);
                break;
        }
        return send(params, postData);
    }
    return send(params);
}
exports.req = req;
