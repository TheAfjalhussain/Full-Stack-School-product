const router = require('express').Router();
const ctrl = require('../controllers/publicController');

router.get('/hero-sliders', ctrl.getHeroSliders);
router.get('/statistics', ctrl.getStatistics);
router.get('/testimonials', ctrl.getTestimonials);
router.get('/features', ctrl.getFeatures);
router.get('/programs', ctrl.getPrograms);
router.get('/gallery-images', ctrl.getGalleryImages);
router.get('/featured-moments', ctrl.getFeaturedMoments);
router.get('/staff-members', ctrl.getStaffMembers);
router.get('/core-values', ctrl.getCoreValues);
router.get('/facilities', ctrl.getFacilities);
router.get('/students', ctrl.getStudents);
router.get('/student-clubs', ctrl.getStudentClubs);
router.get('/academic-terms', ctrl.getAcademicTerms);
router.get('/calendar-events', ctrl.getCalendarEvents);
router.get('/important-dates', ctrl.getImportantDates);
router.get('/school-info', ctrl.getSchoolInfo);
router.get('/departments', ctrl.getDepartments);
router.get('/event-categories', ctrl.getEventCategories);
router.get('/overview-items', ctrl.getOverviewItems);
router.post('/contact', ctrl.submitContact);

module.exports = router;
