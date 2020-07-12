// @ts-nocheck
import { DataTypes } from 'sequelize';
import { sequelize } from './configuration';

const attributes = {
  Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "Id"
  },
  BookId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "BookId"
  },
  GenreId: {
    type: DataTypes.INTEGER.UNSIGNED,
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

const LibgenreModel = sequelize.define("libgenre_model", attributes, options);

export const LibGenre = LibgenreModel;
