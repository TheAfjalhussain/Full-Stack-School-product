const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Facility', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING(50), defaultValue: 'BookOpen' },
    color: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
