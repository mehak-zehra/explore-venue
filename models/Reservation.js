const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reservation extends Model {}

// define table columns and configuration
Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull:  false,
      primaryKey: true,
      autoIncrement: true
    },
    venue_id: {
     type: DataTypes.INTEGER,
     allowNull:  false,
    //  references: {
    //     model: 'Venue',
    //     key: 'id'
    //   }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:  false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull:  false,
    },
    confirmation_id: {
      type:DataTypes.STRING,
      allowNull: false
  },
  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Reservation'
  }
);

module.exports = Reservation;