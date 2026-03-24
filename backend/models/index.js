const sequelize = require('../config/database');

const Admin = require('./Admin')(sequelize);
const HeroSlider = require('./HeroSlider')(sequelize);
const Statistic = require('./Statistic')(sequelize);
const Testimonial = require('./Testimonial')(sequelize);
const Feature = require('./Feature')(sequelize);
const Program = require('./Program')(sequelize);
const ProgramSubject = require('./ProgramSubject')(sequelize);
const GalleryImage = require('./GalleryImage')(sequelize);
const FeaturedMoment = require('./FeaturedMoment')(sequelize);
const StaffMember = require('./StaffMember')(sequelize);
const CoreValue = require('./CoreValue')(sequelize);
const Facility = require('./Facility')(sequelize);
const Student = require('./Student')(sequelize);
const StudentAchievement = require('./StudentAchievement')(sequelize);
const StudentInterest = require('./StudentInterest')(sequelize);
const StudentClub = require('./StudentClub')(sequelize);
const ClubAchievement = require('./ClubAchievement')(sequelize);
const AcademicTerm = require('./AcademicTerm')(sequelize);
const TermEvent = require('./TermEvent')(sequelize);
const CalendarEvent = require('./CalendarEvent')(sequelize);
const ImportantDate = require('./ImportantDate')(sequelize);
const SchoolInfo = require('./SchoolInfo')(sequelize);
const Department = require('./Department')(sequelize);
const ContactSubmission = require('./ContactSubmission')(sequelize);
const OverviewItem = require('./OverviewItem')(sequelize);
const EventCategory = require('./EventCategory')(sequelize);
const EventCategoryItem = require('./EventCategoryItem')(sequelize);

const models = {
  Admin, HeroSlider, Statistic, Testimonial, Feature,
  Program, ProgramSubject, GalleryImage, FeaturedMoment,
  StaffMember, CoreValue, Facility, Student, StudentAchievement,
  StudentInterest, StudentClub, ClubAchievement, AcademicTerm,
  TermEvent, CalendarEvent, ImportantDate, SchoolInfo, Department,
  ContactSubmission, OverviewItem, EventCategory, EventCategoryItem
};

// Run associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, ...models };
