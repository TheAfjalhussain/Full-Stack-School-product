const {
  HeroSlider, Statistic, Testimonial, Feature, Program, ProgramSubject,
  GalleryImage, FeaturedMoment, StaffMember, CoreValue, Facility,
  Student, StudentAchievement, StudentInterest, StudentClub, ClubAchievement,
  AcademicTerm, TermEvent, CalendarEvent, ImportantDate, SchoolInfo,
  Department, ContactSubmission, OverviewItem, EventCategory, EventCategoryItem
} = require('../models');

exports.getHeroSliders = async (req, res) => {
  try {
    const sliders = await HeroSlider.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] });
    res.json(sliders);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getStatistics = async (req, res) => {
  try {
    const { page } = req.query;
    const where = page ? { page } : {};
    const stats = await Statistic.findAll({ where, order: [['displayOrder', 'ASC']] });
    res.json(stats);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] });
    res.json(testimonials);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getFeatures = async (req, res) => {
  try {
    const { section } = req.query;
    const where = section ? { section } : {};
    const features = await Feature.findAll({ where, order: [['displayOrder', 'ASC']] });
    res.json(features);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
      include: [{ model: ProgramSubject, as: 'subjects', order: [['displayOrder', 'ASC']] }],
      order: [['displayOrder', 'ASC']]
    });
    res.json(programs);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getGalleryImages = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category && category !== 'All' ? { category } : {};
    const images = await GalleryImage.findAll({ where, order: [['displayOrder', 'ASC']] });
    res.json(images);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getFeaturedMoments = async (req, res) => {
  try {
    const moments = await FeaturedMoment.findAll({ order: [['displayOrder', 'ASC']] });
    res.json(moments);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getStaffMembers = async (req, res) => {
  try {
    const staff = await StaffMember.findAll({ order: [['displayOrder', 'ASC']] });
    res.json(staff);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getCoreValues = async (req, res) => {
  try {
    const values = await CoreValue.findAll({ order: [['displayOrder', 'ASC']] });
    res.json(values);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.findAll({ order: [['displayOrder', 'ASC']] });
    res.json(facilities);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getStudents = async (req, res) => {
  try {
    const { featured } = req.query;
    const where = featured === 'true' ? { isFeatured: true } : {};
    const students = await Student.findAll({
      where,
      include: [
        { model: StudentAchievement, as: 'achievements', order: [['displayOrder', 'ASC']] },
        { model: StudentInterest, as: 'interests', order: [['displayOrder', 'ASC']] }
      ],
      order: [['displayOrder', 'ASC']]
    });
    res.json(students);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getStudentClubs = async (req, res) => {
  try {
    const clubs = await StudentClub.findAll({
      include: [{ model: ClubAchievement, as: 'achievements', order: [['displayOrder', 'ASC']] }],
      order: [['displayOrder', 'ASC']]
    });
    res.json(clubs);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAcademicTerms = async (req, res) => {
  try {
    const terms = await AcademicTerm.findAll({
      include: [{ model: TermEvent, as: 'events', order: [['displayOrder', 'ASC']] }],
      order: [['displayOrder', 'ASC']]
    });
    res.json(terms);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getCalendarEvents = async (req, res) => {
  try {
    const { upcoming } = req.query;
    const where = upcoming === 'true' ? { isPast: false } : {};
    const events = await CalendarEvent.findAll({ where, order: [['displayOrder', 'ASC']] });
    res.json(events);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getImportantDates = async (req, res) => {
  try {
    const dates = await ImportantDate.findAll({ order: [['category', 'ASC'], ['displayOrder', 'ASC']] });
    res.json(dates);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getSchoolInfo = async (req, res) => {
  try {
    const info = await SchoolInfo.getInfo();
    res.json(info);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({ order: [['displayOrder', 'ASC']] });
    res.json(departments);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getEventCategories = async (req, res) => {
  try {
    const categories = await EventCategory.findAll({
      include: [{ model: EventCategoryItem, as: 'items', order: [['displayOrder', 'ASC']] }],
      order: [['displayOrder', 'ASC']]
    });
    res.json(categories);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOverviewItems = async (req, res) => {
  try {
    const { section } = req.query;
    const where = section ? { section } : {};
    const items = await OverviewItem.findAll({ where, order: [['displayOrder', 'ASC']] });
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const submission = await ContactSubmission.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully!', id: submission.id });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
