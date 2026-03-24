const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const models = require('../models');

// Login page (no auth)
router.get('/login', (req, res) => {
  res.render('admin/login', { layout: false, error: null });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await models.Admin.findOne({ where: { username } });
    if (!admin || !(await admin.validatePassword(password))) {
      return res.render('admin/login', { layout: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.render('admin/login', { layout: false, error: 'Something went wrong' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login');
});

// All routes below require auth
router.use(authMiddleware);

// Dashboard
router.get('/', (req, res) => res.redirect('/admin/dashboard'));

router.get('/dashboard', async (req, res) => {
  try {
    const [students, staff, events, unreadContacts, totalContacts, galleryCount] = await Promise.all([
      models.Student.count(),
      models.StaffMember.count(),
      models.CalendarEvent.count(),
      models.ContactSubmission.count({ where: { isRead: false } }),
      models.ContactSubmission.count(),
      models.GalleryImage.count()
    ]);
    res.render('admin/dashboard', { admin: req.admin, students, staff, events, unreadContacts, totalContacts, galleryCount, currentPage: 'dashboard' });
  } catch (err) {
    res.render('admin/dashboard', { admin: req.admin, students: 0, staff: 0, events: 0, unreadContacts: 0, totalContacts: 0, galleryCount: 0, currentPage: 'dashboard' });
  }
});

// Generic page renderer
const pages = [
  { path: 'hero-sliders', model: 'HeroSlider', title: 'Hero Sliders' },
  { path: 'statistics', model: 'Statistic', title: 'Statistics' },
  { path: 'testimonials', model: 'Testimonial', title: 'Testimonials' },
  { path: 'features', model: 'Feature', title: 'Features' },
  { path: 'programs', model: 'Program', title: 'Programs', include: [{ model: models.ProgramSubject, as: 'subjects' }] },
  { path: 'gallery', model: 'GalleryImage', title: 'Gallery Images' },
  { path: 'featured-moments', model: 'FeaturedMoment', title: 'Featured Moments' },
  { path: 'staff', model: 'StaffMember', title: 'Staff Members' },
  { path: 'core-values', model: 'CoreValue', title: 'Core Values' },
  { path: 'facilities', model: 'Facility', title: 'Facilities' },
  { path: 'students', model: 'Student', title: 'Students', include: [{ model: models.StudentAchievement, as: 'achievements' }, { model: models.StudentInterest, as: 'interests' }] },
  { path: 'student-clubs', model: 'StudentClub', title: 'Student Clubs', include: [{ model: models.ClubAchievement, as: 'achievements' }] },
  { path: 'academic-terms', model: 'AcademicTerm', title: 'Academic Terms', include: [{ model: models.TermEvent, as: 'events' }] },
  { path: 'calendar-events', model: 'CalendarEvent', title: 'Calendar Events' },
  { path: 'important-dates', model: 'ImportantDate', title: 'Important Dates' },
  { path: 'departments', model: 'Department', title: 'Departments' },
  { path: 'overview-items', model: 'OverviewItem', title: 'Overview Items' },
  { path: 'event-categories', model: 'EventCategory', title: 'Event Categories', include: [{ model: models.EventCategoryItem, as: 'items' }] }
];

pages.forEach(({ path, model, title, include }) => {
  router.get(`/${path}`, async (req, res) => {
    try {
      const queryOptions = { order: [['displayOrder', 'ASC']] };
      if (include) queryOptions.include = include;
      const items = await models[model].findAll(queryOptions);
      res.render('admin/manage', { admin: req.admin, items, title, modelName: model, path, currentPage: path });
    } catch (err) {
      res.render('admin/manage', { admin: req.admin, items: [], title, modelName: model, path, currentPage: path, error: err.message });
    }
  });
});

// School Info (singleton)
router.get('/school-info', async (req, res) => {
  try {
    const info = await models.SchoolInfo.getInfo();
    res.render('admin/school-info', { admin: req.admin, info, currentPage: 'school-info' });
  } catch (err) {
    res.render('admin/school-info', { admin: req.admin, info: {}, currentPage: 'school-info' });
  }
});

// Contact Submissions
router.get('/contact-submissions', async (req, res) => {
  try {
    const submissions = await models.ContactSubmission.findAll({ order: [['createdAt', 'DESC']] });
    res.render('admin/contact-submissions', { admin: req.admin, submissions, currentPage: 'contact-submissions' });
  } catch (err) {
    res.render('admin/contact-submissions', { admin: req.admin, submissions: [], currentPage: 'contact-submissions' });
  }
});

module.exports = router;
