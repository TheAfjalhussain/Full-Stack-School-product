const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AcademicTerm = sequelize.define('AcademicTerm', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    season: { type: DataTypes.STRING(50) },
    startDate: { type: DataTypes.STRING(50) },
    endDate: { type: DataTypes.STRING(50) },
    description: { type: DataTypes.TEXT },
    badgeColor: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  AcademicTerm.associate = (models) => {
    AcademicTerm.hasMany(models.TermEvent, { foreignKey: 'termId', as: 'events' });
  };

  return AcademicTerm;
};
