// @ts-nocheck
import { DataTypes } from 'sequelize';
import { sequelize } from './configuration';

const attributes = {
  BookId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "BookId"
  },
  FileSize: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "FileSize"
  },
  Time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Time"
  },
  Title: {
    type: DataTypes.STRING(254),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Title"
  },
  Title1: {
    type: DataTypes.STRING(254),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Title1"
  },
  Lang: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    defaultValue: "ru",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Lang"
  },
  LangEx: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "LangEx"
  },
  SrcLang: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "SrcLang"
  },
  FileType: {
    type: DataTypes.CHAR(4),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "FileType"
  },
  Encoding: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Encoding"
  },
  Year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Year"
  },
  Deleted: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Deleted"
  },
  Ver: {
    type: DataTypes.STRING(8),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Ver"
  },
  FileAuthor: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "FileAuthor"
  },
  N: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "N"
  },
  keywords: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "keywords"
  },
  md5: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "md5",
    unique: "md5"
  },
  Modified: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: "2009-11-29 05:00:00",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Modified"
  },
  pmd5: {
    type: DataTypes.CHAR(32),
    allowNull: false,
    defaultValue: "",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "pmd5"
  },
  InfoCode: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "InfoCode"
  },
  Pages: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Pages"
  },
  Chars: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: "0",
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Chars"
  }
};
const options = {
  tableName: "libbook",
  comment: "",
  indexes: [{
    name: "BookDel",
    unique: true,
    type: "BTREE",
    fields: ["Deleted", "BookId"]
  }, {
    name: "Title",
    unique: false,
    type: "BTREE",
    fields: ["Title"]
  }, {
    name: "Year",
    unique: false,
    type: "BTREE",
    fields: ["Year"]
  }, {
    name: "Deleted",
    unique: false,
    type: "BTREE",
    fields: ["Deleted"]
  }, {
    name: "FileType",
    unique: false,
    type: "BTREE",
    fields: ["FileType"]
  }, {
    name: "Lang",
    unique: false,
    type: "BTREE",
    fields: ["Lang"]
  }, {
    name: "FileSize",
    unique: false,
    type: "BTREE",
    fields: ["FileSize"]
  }, {
    name: "FileAuthor",
    unique: false,
    type: "BTREE",
    fields: ["FileAuthor"]
  }, {
    name: "N",
    unique: false,
    type: "BTREE",
    fields: ["N"]
  }, {
    name: "Title1",
    unique: false,
    type: "BTREE",
    fields: ["Title1"]
  }, {
    name: "FileTypeDel",
    unique: false,
    type: "BTREE",
    fields: ["Deleted", "FileType"]
  }, {
    name: "LangDel",
    unique: false,
    type: "BTREE",
    fields: ["Deleted", "Lang"]
  }]
};
const LibbookModel = sequelize.define("libbook_model", attributes, options);

export const LibBook = LibbookModel;
