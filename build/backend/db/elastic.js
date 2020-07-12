"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SphinxClient = require("sphinxapi");
const cl = new SphinxClient();
cl.SetServer('localhost', 19312);
cl.Query('test', function (err, result) {
    console.log(err, result);
});
