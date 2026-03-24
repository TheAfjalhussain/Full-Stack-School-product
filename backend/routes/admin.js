const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const ctrl = require('../controllers/adminController');

router.use(authMiddleware);

// File upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

// Helper to mount CRUD routes
function mountCrud(path, controller) {
  if (controller.getAll) router.get(`/${path}`, controller.getAll);
  if (controller.getOne) router.get(`/${path}/:id`, controller.getOne);
  if (controller.create) router.post(`/${path}`, controller.create);
  if (controller.update) router.put(`/${path}/:id`, controller.update);
  if (controller.delete) router.delete(`/${path}/:id`, controller.delete);
  if (controller.reorder) router.put(`/${path}-reorder`, controller.reorder);
}

mountCrud('hero-sliders', ctrl.heroSliders);
mountCrud('statistics', ctrl.statistics);
mountCrud('testimonials', ctrl.testimonials);
mountCrud('features', ctrl.features);
mountCrud('programs', ctrl.programs);
mountCrud('program-subjects', ctrl.programSubjects);
mountCrud('gallery-images', ctrl.galleryImages);
mountCrud('featured-moments', ctrl.featuredMoments);
mountCrud('staff-members', ctrl.staffMembers);
mountCrud('core-values', ctrl.coreValues);
mountCrud('facilities', ctrl.facilities);
mountCrud('students', ctrl.students);
mountCrud('student-achievements', ctrl.studentAchievements);
mountCrud('student-interests', ctrl.studentInterests);
mountCrud('student-clubs', ctrl.studentClubs);
mountCrud('club-achievements', ctrl.clubAchievements);
mountCrud('academic-terms', ctrl.academicTerms);
mountCrud('term-events', ctrl.termEvents);
mountCrud('calendar-events', ctrl.calendarEvents);
mountCrud('important-dates', ctrl.importantDates);
mountCrud('departments', ctrl.departments);
mountCrud('overview-items', ctrl.overviewItems);
mountCrud('event-categories', ctrl.eventCategories);
mountCrud('event-category-items', ctrl.eventCategoryItems);

// School Info (singleton - no create/delete)
router.get('/school-info', ctrl.schoolInfo.getAll);
router.put('/school-info', ctrl.schoolInfo.update);

// Contact Submissions
router.get('/contact-submissions', ctrl.contactSubmissions.getAll);
router.patch('/contact-submissions/:id/read', ctrl.contactSubmissions.markRead);
router.delete('/contact-submissions/:id', ctrl.contactSubmissions.delete);

module.exports = router;
