const sequelize = require('../config/database');
const SectionContent = require('./SectionContent');
const Service = require('./Service');
const Doctor = require('./Doctor');
const Facility = require('./Facility');
const User = require('./User'); // Auth
const HeroSlide = require('./HeroSlide');

// Associations can be defined here if needed

module.exports = {
  sequelize,
  SectionContent,
  Service,
  Doctor,
  Facility,
  User,
  HeroSlide
};
