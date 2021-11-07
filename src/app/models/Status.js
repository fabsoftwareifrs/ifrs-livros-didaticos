"use strict";
const { Model } = require("sequelize");
import sequelizePaginate from "sequelize-paginate";

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Copy, { foreignKey: "statusId" });
    }
  }
  Status.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      isAvailable: DataTypes.BOOLEAN,
      isDefault: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Status",
    }
  );

  sequelizePaginate.paginate(Status);
  return Status;
};
