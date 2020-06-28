"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fast = require("fastify");
const cors = require("fastify-cors");
const fastify_decorators_1 = require("fastify-decorators");
const path_1 = require("path");
const fastify = fast();
fastify.register(fastify_decorators_1.bootstrap, {
    directory: path_1.resolve(__dirname, 'controllers'),
});
fastify.register(cors);
const PORT = 5000;
fastify.listen(PORT, '0.0.0.0');
console.log(`started on port ${PORT}`);
