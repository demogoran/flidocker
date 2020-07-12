"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibGenre = void 0;
const sequelize_1 = require("sequelize");
const configuration_1 = require("./configuration");
const attributes = {
    Id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "Id"
    },
    BookId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: "0",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "BookId"
    },
    GenreId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: "0",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "GenreId"
    }
};
const options = {
    tableName: "libgenre",
    comment: "",
    indexes: [{
            name: "u",
            unique: true,
            type: "BTREE",
            fields: ["BookId", "GenreId"]
        }, {
            name: "igenre",
            unique: false,
            type: "BTREE",
            fields: ["GenreId"]
        }, {
            name: "ibook",
            unique: false,
            type: "BTREE",
            fields: ["BookId"]
        }]
};
const LibgenreModel = configuration_1.sequelize.define("libgenre_model", attributes, options);
exports.LibGenre = LibgenreModel;
