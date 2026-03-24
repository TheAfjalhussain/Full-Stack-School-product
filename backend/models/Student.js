const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Student = sequelize.define('Student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    grade: { type: DataTypes.STRING(20) },
    quote: { type: DataTypes.TEXT },
    imageInitials: { type: DataTypes.STRING(10) },
    color: { type: DataTypes.STRING(50), defaultValue: 'blue' },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  Student.associate = (models) => {
    Student.hasMany(models.StudentAchievement, { foreignKey: 'studentId', as: 'achievements' });
    Student.hasMany(models.StudentInterest, { foreignKey: 'studentId', as: 'interests' });
  };

  return Student;
};
