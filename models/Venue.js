const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Venue extends Model {}

// define table columns and configuration
Venue.init(
  {
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
    main_image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
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