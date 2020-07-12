// @ts-nocheck
import { DataTypes } from 'sequelize';
import { sequelize } from './configuration';

const attributes = {
  SeqId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "SeqId"
  },
  SeqName: {
    type: DataTypes.STRING(254),
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

const LibseqnameModel = sequelize.define("libseqname_model", attributes, options);

export const LibSeqName = LibseqnameModel;
