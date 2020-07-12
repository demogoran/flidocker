"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibAuthorName = void 0;
const sequelize_1 = require("sequelize");
const configuration_1 = require("./configuration");
const attributes = {
    AvtorId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "AvtorId"
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING(99),
        allowNull: false,
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "FirstName"
    },
    MiddleName: {
        type: sequelize_1.DataTypes.STRING(99),
        allowNull: false,
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "MiddleName"
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING(99),
        allowNull: false,
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "LastName"
    },
    NickName: {
        type: sequelize_1.DataTypes.STRING(33),
        allowNull: false,
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "NickName"
    },
    uid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "uid"
    },
    Email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "Email"
    },
    Homepage: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "Homepage"
    },
    Gender: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "Gender"
    },
    MasterId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "MasterId"
    }
};
const options = {
    tableName: "libavtorname",
    comment: "",
    indexes: [{
            name: "FirstName",
            unique: false,
            type: "BTREE",
            fields: ["FirstName"]
        }, {
            name: "LastName",
            unique: false,
            type: "BTREE",
            fields: ["LastName"]
        }, {
            name: "email",
            unique: false,
            type: "BTREE",
            fields: ["Email"]
        }, {
            name: "Homepage",
            unique: false,
            type: "BTREE",
            fields: ["Homepage"]
        }, {
            name: "uid",
            unique: false,
            type: "BTREE",
            fields: ["uid"]
        }, {
            name: "MasterId",
            unique: false,
            type: "BTREE",
            fields: ["MasterId"]
        }]
};
const LibavtornameModel = configuration_1.sequelize.define("libavtorname_model", attributes, options);
exports.LibAuthorName = LibavtornameModel;
