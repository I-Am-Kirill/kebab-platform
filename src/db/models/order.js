'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    name: DataTypes.STRING,
    wokerId: DataTypes.STRING,
    lokation: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.STRING,
    discont: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};