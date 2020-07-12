"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibAuthor = void 0;
const sequelize_1 = require("sequelize");
const configuration_1 = require("./configuration");
const attributes = {
    BookId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: "0",
        primaryKey: true,
        autoIncrement: false,
        comment: null,
        field: "BookId"
    },
    AvtorId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: "0",
        primaryKey: true,
        autoIncrement: false,
        comment: null,
        field: "AvtorId"
    },
    Pos: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: "0",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "Pos"
    }
};
const options = {
    tableName: "libavtor",
    comment: "",
    indexes: [{
            name: "iav",
            unique: false,
            type: "BTREE",
            fields: ["AvtorId"]
        }]
};
const LibavtorModel = configuration_1.sequelize.define("libavtor_model", attributes, options);
exports.LibAuthor = LibavtorModel;
