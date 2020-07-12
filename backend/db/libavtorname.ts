// @ts-nocheck
import { DataTypes } from 'sequelize';
import { sequelize } from './configuration';

const attributes = {
  AvtorId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "AvtorId"
  },
  FirstName: {
    type: DataTypes.STRING(99),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "FirstName"
  },
  MiddleName: {
    type: DataTypes.STRING(99),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "MiddleName"
  },
  LastName: {
    type: DataTypes.STRING(99),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "LastName"
  },
  NickName: {
    type: DataTypes.STRING(33),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "NickName"
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "uid"
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Email"
  },
  Homepage: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Homepage"
  },
  Gender: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Gender"
  },
  MasterId: {
    type: DataTypes.INTEGER,
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

const LibavtornameModel = sequelize.define("libavtorname_model", attributes, options);

export const LibAuthorName = LibavtornameModel;
