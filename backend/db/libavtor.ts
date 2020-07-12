// @ts-nocheck
import { DataTypes } from 'sequelize';
import { sequelize } from './configuration';

const attributes = {
  BookId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: true,
    autoIncrement: false,
    comment: null,
    field: "BookId"
  },
  AvtorId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: true,
    autoIncrement: false,
    comment: null,
    field: "AvtorId"
  },
  Pos: {
    type: DataTypes.INTEGER.UNSIGNED,
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
const LibavtorModel = sequelize.define("libavtor_model", attributes, options);

export const LibAuthor = LibavtorModel;