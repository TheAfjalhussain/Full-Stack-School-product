const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StudentClub = sequelize.define('StudentClub', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    memberCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING(50), defaultValue: 'Users' },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  StudentClub.associate = (models) => {
    StudentClub.hasMany(models.ClubAchievement, { foreignKey: 'clubId', as: 'achievements' });
  };

  return StudentClub;
};
