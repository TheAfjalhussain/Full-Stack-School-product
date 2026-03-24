const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StudentAchievement = sequelize.define('StudentAchievement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    achievement: { type: DataTypes.STRING(200), allowNull: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  StudentAchievement.associate = (models) => {
    StudentAchievement.belongsTo(models.Student, { foreignKey: 'studentId' });
  };

  return StudentAchievement;
};
