"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: 'localhost',
    username: "user",
    password: "pass",
    logging: true,
    database: 'data',
    define: {
        timestamps: false
    },
    dialectOptions: {
        connectTimeout: 1000 * 1000,
        multipleStatements: true
    }
});
