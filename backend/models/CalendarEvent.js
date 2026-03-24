const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('CalendarEvent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.STRING(50) },
    startTime: { type: DataTypes.STRING(20) },
    endTime: { type: DataTypes.STRING(20) },
    location: { type: DataTypes.STRING(200) },
    category: { type: DataTypes.STRING(50), defaultValue: 'General' },
    imageUrl: { type: DataTypes.STRING(500) },
    badgeColor: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    isPast: { type: DataTypes.BOOLEAN, defaultValue: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
