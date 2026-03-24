const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventCategory = sequelize.define('EventCategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING(50), defaultValue: 'Users' },
    color: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  EventCategory.associate = (models) => {
    EventCategory.hasMany(models.EventCategoryItem, { foreignKey: 'categoryId', as: 'items' });
  };

  return EventCategory;
};
