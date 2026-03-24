const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('HeroSlider', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imageUrl: { type: DataTypes.STRING(500), allowNull: false },
    title: { type: DataTypes.STRING(200) },
    subtitle: { type: DataTypes.TEXT },
    buttonText: { type: DataTypes.STRING(100) },
    buttonLink: { type: DataTypes.STRING(200) },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
};
