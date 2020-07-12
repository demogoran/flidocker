// @ts-nocheck
import { DataTypes } from 'sequelize';
import { sequelize } from './configuration';

const attributes = {
  GenreId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "GenreId"
  },
  GenreCode: {
    type: DataTypes.STRING(45),
    allowNull: false,
    defaultValue: "",
    primaryKey: true,
    autoIncrement: false,
    comment: null,
    field: "GenreCode"
  },
  GenreDesc: {
    type: DataTypes.STRING(99),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "GenreDesc"
  },
  GenreMeta: {
    type: DataTypes.STRING(45),
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

const LibgenrelistModel = sequelize.define("libgenrelist_model", attributes, options);

export const LibGenreList = LibgenrelistModel;
