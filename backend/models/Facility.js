const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Facility = sequelize.define('Facility', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Facility;
