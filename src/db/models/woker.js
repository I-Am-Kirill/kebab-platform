const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class woker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ order }) {
      this.hasMany(order, { foreignKey: 'wokerId' });
    }
  }
  woker.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    isworker: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    lat: DataTypes.REAL,
    lon: DataTypes.REAL,
  }, {
    sequelize,
    modelName: 'woker',
  });
  return woker;
};
