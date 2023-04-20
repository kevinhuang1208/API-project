'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      )
      Booking.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
