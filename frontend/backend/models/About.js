const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('StaffMember', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(100) },
    dectreption1: { type: DataTypes.STRING(100) },
    dectreption2: { type: DataTypes.STRING(100) },
    imageUrl: { type: DataTypes.STRING(100)},
    page: { type: DataTypes.ENUM('home', 'about', 'events'), defaultValue: 'home' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
