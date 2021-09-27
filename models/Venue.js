const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Venue extends Model {}

// define table columns and configuration
Venue.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    id: {
      type: DataTypes.INTEGER,
      allowNull:  false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
     type: DataTypes.STRING,
     allowNull:  false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull:  false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull:  false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },


  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Venue'
  }
);

module.exports = Venue;