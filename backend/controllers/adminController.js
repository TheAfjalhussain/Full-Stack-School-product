const models = require('../models');

// Generic CRUD factory
function crudController(modelName, options = {}) {
  const Model = models[modelName];
  const { includes = [], searchFields = [] } = options;

  return {
    getAll: async (req, res) => {
      try {
        const queryOptions = { order: [['displayOrder', 'ASC']] };
        if (includes.length) queryOptions.include = includes;
        const items = await Model.findAll(queryOptions);
        res.json(items);
      } catch (err) { res.status(500).json({ error: err.message }); }
    },

    getOne: async (req, res) => {
      try {
        const queryOptions = { where: { id: req.params.id } };
        if (includes.length) queryOptions.include = includes;
        const item = await Model.findOne(queryOptions);
        if (!item) return res.status(404).json({ error: `${modelName} not found` });
        res.json(item);
      } catch (err) { res.status(500).json({ error: err.message }); }
    },

    create: async (req, res) => {
      try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
      } catch (err) { res.status(400).json({ error: err.message }); }
    },

    update: async (req, res) => {
      try {
        const item = await Model.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: `${modelName} not found` });
        await item.update(req.body);
        res.json(item);
      } catch (err) { res.status(400).json({ error: err.message }); }
    },

    delete: async (req, res) => {
      try {
        const item = await Model.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: `${modelName} not found` });
        await item.destroy();
        res.json({ message: `${modelName} deleted successfully` });
      } catch (err) { res.status(500).json({ error: err.message }); }
    },

    reorder: async (req, res) => {
      try {
        const { items } = req.body; // [{id, displayOrder}]
        for (const { id, displayOrder } of items) {
          await Model.update({ displayOrder }, { where: { id } });
        }
        res.json({ message: 'Reorder successful' });
      } catch (err) { res.status(500).json({ error: err.message }); }
    }
  };
}

// Create controllers for each model
const controllers = {
  heroSliders: crudController('HeroSlider'),
  statistics: crudController('Statistic'),
  testimonials: crudController('Testimonial'),
  features: crudController('Feature'),
  programs: crudController('Program', {
    includes: [{ model: models.ProgramSubject, as: 'subjects' }]
  }),
  programSubjects: crudController('ProgramSubject'),
  galleryImages: crudController('GalleryImage'),
  featuredMoments: crudController('FeaturedMoment'),
  staffMembers: crudController('StaffMember'),
  coreValues: crudController('CoreValue'),
  facilities: crudController('Facility'),
  students: crudController('Student', {
    includes: [
      { model: models.StudentAchievement, as: 'achievements' },
      { model: models.StudentInterest, as: 'interests' }
    ]
  }),
  studentAchievements: crudController('StudentAchievement'),
  studentInterests: crudController('StudentInterest'),
  studentClubs: crudController('StudentClub', {
    includes: [{ model: models.ClubAchievement, as: 'achievements' }]
  }),
  clubAchievements: crudController('ClubAchievement'),
  academicTerms: crudController('AcademicTerm', {
    includes: [{ model: models.TermEvent, as: 'events' }]
  }),
  termEvents: crudController('TermEvent'),
  calendarEvents: crudController('CalendarEvent'),
  importantDates: crudController('ImportantDate'),
  departments: crudController('Department'),
  overviewItems: crudController('OverviewItem'),
  eventCategories: crudController('EventCategory', {
    includes: [{ model: models.EventCategoryItem, as: 'items' }]
  }),
  eventCategoryItems: crudController('EventCategoryItem'),

  // Special: SchoolInfo (singleton)
  schoolInfo: {
    getAll: async (req, res) => {
      try {
        const info = await models.SchoolInfo.getInfo();
        res.json(info);
      } catch (err) { res.status(500).json({ error: err.message }); }
    },
    update: async (req, res) => {
      try {
        let info = await models.SchoolInfo.findOne();
        if (!info) info = await models.SchoolInfo.create(req.body);
        else await info.update(req.body);
        res.json(info);
      } catch (err) { res.status(400).json({ error: err.message }); }
    }
  },

  // Special: ContactSubmissions
  contactSubmissions: {
    getAll: async (req, res) => {
      try {
        const submissions = await models.ContactSubmission.findAll({ order: [['createdAt', 'DESC']] });
        res.json(submissions);
      } catch (err) { res.status(500).json({ error: err.message }); }
    },
    markRead: async (req, res) => {
      try {
        const sub = await models.ContactSubmission.findByPk(req.params.id);
        if (!sub) return res.status(404).json({ error: 'Submission not found' });
        await sub.update({ isRead: true });
        res.json(sub);
      } catch (err) { res.status(500).json({ error: err.message }); }
    },
    delete: async (req, res) => {
      try {
        const sub = await models.ContactSubmission.findByPk(req.params.id);
        if (!sub) return res.status(404).json({ error: 'Submission not found' });
        await sub.destroy();
        res.json({ message: 'Submission deleted' });
      } catch (err) { res.status(500).json({ error: err.message }); }
    }
  }
};

module.exports = controllers;
