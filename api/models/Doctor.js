const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doctor = sequelize.define('Doctor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  schedule: {
    type: DataTypes.STRING, // e.g., "Mon-Fri: 09:00 - 14:00"
    allowNull: true
  }
});

module.exports = Doctor;
