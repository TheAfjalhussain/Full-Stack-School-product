const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('GalleryImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING(50), defaultValue: 'General' },
    imageUrl: { type: DataTypes.STRING(500), allowNull: false },
    altText: { type: DataTypes.STRING(200) },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
