const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubAchievement = sequelize.define('ClubAchievement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clubId: { type: DataTypes.INTEGER, allowNull: false },
    achievement: { type: DataTypes.STRING(200), allowNull: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

  ClubAchievement.associate = (models) => {
    ClubAchievement.belongsTo(models.StudentClub, { foreignKey: 'clubId' });
  };

  return ClubAchievement;
};
