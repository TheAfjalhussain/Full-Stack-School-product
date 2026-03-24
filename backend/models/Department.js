const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Department', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    email: { type: DataTypes.STRING(100) },
    phone: { type: DataTypes.STRING(50) },
    phoneExtension: { type: DataTypes.STRING(10) },
    color: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
