const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('StaffMember', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(100) },
    dectreption: { type: DataTypes.STRING(100) },
    address: { type: DataTypes.STRING(50) },
    startDate: { type: DataTypes.STRING(50) },
    endDate: { type: DataTypes.STRING(50) },
    imageUrl: { type: DataTypes.STRING(100)},
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
