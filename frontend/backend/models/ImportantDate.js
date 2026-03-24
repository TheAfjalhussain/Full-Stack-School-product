const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ImportantDate', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING(100), allowNull: false },
    eventName: { type: DataTypes.STRING(200), allowNull: false },
    dateRange: { type: DataTypes.STRING(100) },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
