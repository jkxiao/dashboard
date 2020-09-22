"use strict";

const express = require("express");
const http = require("http");

const initApi = require("./api");

const PORT = 4000;

let app = express();
let server = http.createServer(app);

const main = async () => {
  await initApi(app);
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
};
main();
