const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TermEvent = sequelize.define('TermEvent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    termId: { type: DataTypes.INTEGER, allowNull: false },
    eventName: { type: DataTypes.STRING(200), allowNull: false },
    dateRange: { type: DataTypes.STRING(50) },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  TermEvent.associate = (models) => {
    TermEvent.belongsTo(models.AcademicTerm, { foreignKey: 'termId' });
  };

  return TermEvent;
};
