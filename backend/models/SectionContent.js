const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SectionContent = sequelize.define('SectionContent', {
  section_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
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
    allowNull: true
  },
  extra_data: {
    type: DataTypes.JSON, // For button texts, links, map coords etc
    allowNull: true
  }
});

module.exports = SectionContent;
