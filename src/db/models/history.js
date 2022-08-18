'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({order, user}) {
      this.hasMany(order, { foreignKey: 'orderId' });
      this.hasMany(user, { foreignKey: 'userId' })
    }
  }
  history.init({
    userID: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};