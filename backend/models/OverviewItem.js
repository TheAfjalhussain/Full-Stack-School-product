const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('OverviewItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    section: { type: DataTypes.ENUM('academic', 'studentLife'), allowNull: false },
    text: { type: DataTypes.STRING(500), allowNull: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
