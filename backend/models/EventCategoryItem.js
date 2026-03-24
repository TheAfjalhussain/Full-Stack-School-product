const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventCategoryItem = sequelize.define('EventCategoryItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(200), allowNull: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  EventCategoryItem.associate = (models) => {
    EventCategoryItem.belongsTo(models.EventCategory, { foreignKey: 'categoryId' });
  };

  return EventCategoryItem;
};
