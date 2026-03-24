const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SchoolInfo = sequelize.define('SchoolInfo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    address: { type: DataTypes.TEXT },
    phone: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(100) },
    officeHours: { type: DataTypes.TEXT },
    foundedYear: { type: DataTypes.INTEGER },
    studentCount: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    socialLinks: { type: DataTypes.JSON },
    footerTagline: { type: DataTypes.TEXT },
    contactFormEmbed: { type: DataTypes.TEXT },
    admissionUrl: { type: DataTypes.STRING(500) }
  });

  SchoolInfo.getInfo = async function () {
    let info = await SchoolInfo.findOne();
    if (!info) {
      info = await SchoolInfo.create({ name: 'School Name' });
    }
    return info;
  };

  return SchoolInfo;
};
