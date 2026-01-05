const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HeroSlide = sequelize.define('HeroSlide', {
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cta_primary: {
    type: DataTypes.STRING,
    defaultValue: 'Daftar Online'
  },
  cta_secondary: {
    type: DataTypes.STRING,
    defaultValue: 'Hubungi Kami'
  }
});

module.exports = HeroSlide;
