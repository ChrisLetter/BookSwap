"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var router = require("./router");
require('dotenv').config();
var PORT = process.env.SERVER_PORT;
var options = {
    origin: '*',
    credentials: true,
};
var app = express();
app
    .use(cors(options))
    .use(express.json())
    .use(router)
    .listen(PORT, function () {
    console.log("server listening on port " + PORT);
});
