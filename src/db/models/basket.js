const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  basket.init({
    user: DataTypes.STRING,
    worker: DataTypes.STRING,
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    discont: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'basket',
  });
  return basket;
};
