// @ts-nocheck
import { DataTypes } from 'sequelize';
import { sequelize } from './configuration';

const attributes = {
  BookId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: false,
    comment: null,
    field: "BookId"
  },
  nid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "nid"
  },
  Title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Title"
  },
  Body: {
    type: DataTypes.TEXT,
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

const LibbannotationsModel = sequelize.define("libbannotations_model", attributes, options);

export const LibBAnnotation = LibbannotationsModel;
