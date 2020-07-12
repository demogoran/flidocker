"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibBAnnotation = void 0;
const sequelize_1 = require("sequelize");
const configuration_1 = require("./configuration");
const attributes = {
    BookId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: false,
        comment: null,
        field: "BookId"
    },
    nid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "nid"
    },
    Title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "Title"
    },
    Body: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "Body"
    }
};
const options = {
    tableName: "libbannotations",
    comment: "",
    indexes: []
};
const LibbannotationsModel = configuration_1.sequelize.define("libbannotations_model", attributes, options);
exports.LibBAnnotation = LibbannotationsModel;
