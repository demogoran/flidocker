"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibGenreList = void 0;
const sequelize_1 = require("sequelize");
const configuration_1 = require("./configuration");
const attributes = {
    GenreId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "GenreId"
    },
    GenreCode: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "",
        primaryKey: true,
        autoIncrement: false,
        comment: null,
        field: "GenreCode"
    },
    GenreDesc: {
        type: sequelize_1.DataTypes.STRING(99),
        allowNull: false,
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "GenreDesc"
    },
    GenreMeta: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "GenreMeta"
    }
};
const options = {
    tableName: "libgenrelist",
    comment: "",
    indexes: [{
            name: "meta",
            unique: false,
            type: "BTREE",
            fields: ["GenreMeta"]
        }]
};
const LibgenrelistModel = configuration_1.sequelize.define("libgenrelist_model", attributes, options);
exports.LibGenreList = LibgenrelistModel;
