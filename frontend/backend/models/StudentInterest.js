const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StudentInterest = sequelize.define('StudentInterest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    interest: { type: DataTypes.STRING(100), allowNull: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  StudentInterest.associate = (models) => {
    StudentInterest.belongsTo(models.Student, { foreignKey: 'studentId' });
  };

  return StudentInterest;
};
