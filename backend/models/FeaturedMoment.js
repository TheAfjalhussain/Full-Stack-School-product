const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('FeaturedMoment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.STRING(50) },
    imageUrl: { type: DataTypes.STRING(500) },
    stats: { type: DataTypes.JSON },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
