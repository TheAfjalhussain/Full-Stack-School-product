const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ContactSubmission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    subject: { type: DataTypes.STRING(200) },
    message: { type: DataTypes.TEXT, allowNull: false },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
};
