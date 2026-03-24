const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProgramSubject = sequelize.define('ProgramSubject', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    programId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  ProgramSubject.associate = (models) => {
    ProgramSubject.belongsTo(models.Program, { foreignKey: 'programId' });
  };

  return ProgramSubject;
};
