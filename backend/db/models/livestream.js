"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LiveStream extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LiveStream.belongsTo(models.User, { foreignKey: "owner_id" });
    }
  }
  LiveStream.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      owner_id: DataTypes.INTEGER,
      live: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "LiveStream",
    }
  );
  return LiveStream;
};
