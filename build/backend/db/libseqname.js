"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibSeqName = void 0;
const sequelize_1 = require("sequelize");
const configuration_1 = require("./configuration");
const attributes = {
    SeqId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "SeqId"
    },
    SeqName: {
        type: sequelize_1.DataTypes.STRING(254),
        allowNull: false,
        defaultValue: "",
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "SeqName",
        unique: "SeqName_2"
    }
};
const options = {
    tableName: "libseqname",
    comment: "",
    indexes: []
};
const LibseqnameModel = configuration_1.sequelize.define("libseqname_model", attributes, options);
exports.LibSeqName = LibseqnameModel;
