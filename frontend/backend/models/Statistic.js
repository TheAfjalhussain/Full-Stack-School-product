const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Statistic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    label: { type: DataTypes.STRING(100), allowNull: false },
    value: { type: DataTypes.INTEGER, allowNull: false },
    suffix: { type: DataTypes.STRING(10), defaultValue: '' },
    color: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    page: { type: DataTypes.ENUM('home', 'students', 'gallery', 'events'), defaultValue: 'home' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
