const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Feature', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING(50), defaultValue: 'BookOpen' },
    color: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    section: { type: DataTypes.ENUM('whyChoose', 'mission', 'whoShouldApply', 'aboutHighlight'), allowNull: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
