const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Program = sequelize.define('Program', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING(50), defaultValue: 'BookOpen' },
    color: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  Program.associate = (models) => {
    Program.hasMany(models.ProgramSubject, { foreignKey: 'programId', as: 'subjects' });
  };

  return Program;
};
