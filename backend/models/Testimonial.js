const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Testimonial', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.STRING(100) },
    content: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 5, validate: { min: 1, max: 5 } },
    imageInitials: { type: DataTypes.STRING(10) },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
};
