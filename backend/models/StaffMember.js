const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('StaffMember', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    title: { type: DataTypes.STRING(100) },
    badge: { type: DataTypes.STRING(50) },
    bio: { type: DataTypes.TEXT },
    imageInitials: { type: DataTypes.STRING(10) },
    color: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
