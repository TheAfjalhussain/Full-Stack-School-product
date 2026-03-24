require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { sequelize, Admin, HeroSlider, Statistic, Testimonial, Feature, Program, ProgramSubject,
  GalleryImage, FeaturedMoment, StaffMember, CoreValue, Facility, Student, StudentAchievement,
  StudentInterest, StudentClub, ClubAchievement, AcademicTerm, TermEvent, CalendarEvent,
  ImportantDate, SchoolInfo, Department, OverviewItem, EventCategory, EventCategoryItem
} = require('../models');

async function seed() {
  console.log('Starting database seed...');
  await sequelize.sync({ force: true });
  console.log('Tables created.');

  // Admin
  await Admin.create({ username: 'admin', email: 'admin@school.com', password: 'admin123', role: 'superadmin' });
  console.log('Admin created: admin / admin123');

  // Hero Sliders
  await HeroSlider.bulkCreate([
    { imageUrl: 'https://media.istockphoto.com/id/1384305179/photo/school-facade-exterior-3d-illustration.jpg?s=612x612&w=0&k=20&c=aoooB4XMTc9syPNeG0aR-gttZVlfAmak8WxY9wxcvDo=', title: 'Dummy International School', subtitle: 'Dummy International School in india is a beacon of educational excellence.', buttonText: 'Apply for Admission', displayOrder: 0 },
    { imageUrl: 'https://media.istockphoto.com/id/1847784988/photo/293.jpg?s=612x612&w=0&k=20&c=Z_nwOLyqrSPrh4yowDp-29KamuPljt1KMDu6OIawYVc=', title: 'Dummy International School', subtitle: 'Recognized as the best ICSE school in india, nurturing environment for academic rigor.', buttonText: 'Apply for Admission', displayOrder: 1 },
    { imageUrl: 'https://media.istockphoto.com/id/1464533610/photo/sunny-elementary-campus.jpg?s=612x612&w=0&k=20&c=KUBXyKkvH8v6XqNuzassUqs0mLqmqJ03pbrU1ALhDGs=', title: 'Dummy International School', subtitle: 'Where academic rigor meets character development.', buttonText: 'Apply for Admission', displayOrder: 2 }
  ]);

  // Statistics - Home
  await Statistic.bulkCreate([
    { label: 'Years of Excellence', value: 25, suffix: '+', color: 'blue', page: 'home', displayOrder: 0 },
    { label: 'Happy Students', value: 2500, suffix: '+', color: 'amber', page: 'home', displayOrder: 1 },
    { label: 'Expert Teachers', value: 150, suffix: '+', color: 'green', page: 'home', displayOrder: 2 },
    { label: 'Success Rate', value: 95, suffix: '%', color: 'purple', page: 'home', displayOrder: 3 },
    // Students page
    { label: 'Total Students', value: 2500, suffix: '+', color: 'blue', page: 'students', displayOrder: 0 },
    { label: 'Student Clubs', value: 50, suffix: '+', color: 'green', page: 'students', displayOrder: 1 },
    { label: 'Countries Represented', value: 25, suffix: '+', color: 'purple', page: 'students', displayOrder: 2 },
    { label: 'Participation Rate', value: 100, suffix: '%', color: 'amber', page: 'students', displayOrder: 3 },
    // Events page
    { label: 'Annual Events', value: 50, suffix: '+', color: 'blue', page: 'events', displayOrder: 0 },
    { label: 'Clubs & Societies', value: 25, suffix: '+', color: 'green', page: 'events', displayOrder: 1 },
    { label: 'Student Participation', value: 100, suffix: '%', color: 'purple', page: 'events', displayOrder: 2 },
    { label: 'Months Activity', value: 12, suffix: '', color: 'amber', page: 'events', displayOrder: 3 }
  ]);

  // Testimonials
  await Testimonial.bulkCreate([
    { name: 'Sarah Anderson', role: 'Alumni, Class of 2020', content: 'Dummy School provided me with not just excellent education, but also the confidence and skills I needed to succeed in university and beyond.', rating: 5, imageInitials: 'SA', displayOrder: 0 },
    { name: 'Michael Johnson', role: 'Parent', content: 'The teachers at Dummy School genuinely care about each student\'s success. My daughter has flourished both academically and personally.', rating: 5, imageInitials: 'MJ', displayOrder: 1 },
    { name: 'Emily Liu', role: 'Student, Grade 10', content: 'I love coming to school every day! The teachers make learning fun and exciting, and I\'ve made so many great friends here.', rating: 5, imageInitials: 'EL', displayOrder: 2 },
    { name: 'Dr. Robert Chen', role: 'Parent & Professor', content: 'As an educator myself, I\'m impressed by the innovative teaching methods and the holistic approach to student development at Dummy School.', rating: 5, imageInitials: 'RC', displayOrder: 3 }
  ]);

  // Features - Why Choose
  await Feature.bulkCreate([
    { title: 'Proven Track Record', description: '25+ years of educational excellence with 98% college acceptance rate and outstanding academic achievements.', icon: 'GraduationCap', color: 'blue', section: 'whyChoose', displayOrder: 0 },
    { title: 'Expert Faculty', description: 'Highly qualified teachers with advanced degrees and years of experience in their respective fields.', icon: 'Users', color: 'green', section: 'whyChoose', displayOrder: 1 },
    { title: 'Modern Facilities', description: 'State-of-the-art laboratories, smart classrooms, library, sports complex, and technology-enabled learning.', icon: 'Microscope', color: 'purple', section: 'whyChoose', displayOrder: 2 },
    { title: 'Global Perspective', description: 'International curriculum, cultural exchange programs, and preparation for global citizenship.', icon: 'Globe', color: 'amber', section: 'whyChoose', displayOrder: 3 },
    { title: 'Holistic Development', description: 'Focus on academics, sports, arts, leadership, and character development for well-rounded growth.', icon: 'Heart', color: 'red', section: 'whyChoose', displayOrder: 4 },
    { title: 'Award-Winning Programs', description: 'Nationally recognized programs in science, mathematics, arts, and athletics with numerous accolades.', icon: 'Trophy', color: 'indigo', section: 'whyChoose', displayOrder: 5 },
    // Mission
    { title: 'Academic Excellence', description: 'Rigorous curriculum designed to challenge and inspire students to reach their full potential.', icon: 'BookOpen', color: 'amber', section: 'mission', displayOrder: 0 },
    { title: 'Community Focus', description: 'Building strong relationships and fostering a sense of belonging within our school family.', icon: 'Users', color: 'amber', section: 'mission', displayOrder: 1 },
    { title: 'Future Ready', description: 'Preparing students with 21st-century skills for success in an evolving world.', icon: 'Trophy', color: 'amber', section: 'mission', displayOrder: 2 },
    // Who Should Apply
    { title: 'Ambitious Learners', description: 'Students eager to challenge themselves and strive for excellence in academics.', icon: 'Star', color: 'blue', section: 'whoShouldApply', displayOrder: 0 },
    { title: 'Future Leaders', description: 'Young minds ready to develop leadership skills and make a positive impact.', icon: 'Users', color: 'green', section: 'whoShouldApply', displayOrder: 1 },
    { title: 'Creative Thinkers', description: 'Students who think outside the box and embrace innovation in learning.', icon: 'Lightbulb', color: 'purple', section: 'whoShouldApply', displayOrder: 2 },
    { title: 'All-Round Achievers', description: 'Students committed to excelling in academics, sports, and extracurricular activities.', icon: 'Award', color: 'amber', section: 'whoShouldApply', displayOrder: 3 },
    // About highlights
    { title: 'Academic Excellence', description: 'Top-tier curriculum', icon: 'Target', color: 'blue', section: 'aboutHighlight', displayOrder: 0 },
    { title: 'Character Building', description: 'Values & ethics', icon: 'Heart', color: 'amber', section: 'aboutHighlight', displayOrder: 1 },
    { title: 'Innovation', description: 'Modern teaching methods', icon: 'Lightbulb', color: 'green', section: 'aboutHighlight', displayOrder: 2 },
    { title: 'Safe Environment', description: 'Secure & nurturing', icon: 'Shield', color: 'purple', section: 'aboutHighlight', displayOrder: 3 }
  ]);

  // Programs
  const programs = await Program.bulkCreate([
    { name: 'STEM Excellence', description: 'Advanced mathematics, science, technology, and engineering programs', icon: 'Calculator', color: 'blue', displayOrder: 0 },
    { name: 'Arts & Creativity', description: 'Comprehensive arts education fostering creative expression', icon: 'Palette', color: 'purple', displayOrder: 1 },
    { name: 'Music & Performance', description: 'World-class music education and performance opportunities', icon: 'Music', color: 'green', displayOrder: 2 },
    { name: 'Global Studies', description: 'International perspective and cultural understanding', icon: 'Globe', color: 'amber', displayOrder: 3 }
  ]);
  await ProgramSubject.bulkCreate([
    { programId: programs[0].id, name: 'Robotics & AI', displayOrder: 0 },
    { programId: programs[0].id, name: 'Advanced Physics', displayOrder: 1 },
    { programId: programs[0].id, name: 'Computer Science', displayOrder: 2 },
    { programId: programs[0].id, name: 'Engineering Design', displayOrder: 3 },
    { programId: programs[1].id, name: 'Visual Arts', displayOrder: 0 },
    { programId: programs[1].id, name: 'Digital Design', displayOrder: 1 },
    { programId: programs[1].id, name: 'Theater Arts', displayOrder: 2 },
    { programId: programs[1].id, name: 'Creative Writing', displayOrder: 3 },
    { programId: programs[2].id, name: 'Orchestra', displayOrder: 0 },
    { programId: programs[2].id, name: 'Jazz Band', displayOrder: 1 },
    { programId: programs[2].id, name: 'Choir', displayOrder: 2 },
    { programId: programs[2].id, name: 'Music Theory', displayOrder: 3 },
    { programId: programs[3].id, name: 'World Languages', displayOrder: 0 },
    { programId: programs[3].id, name: 'Cultural Studies', displayOrder: 1 },
    { programId: programs[3].id, name: 'Model UN', displayOrder: 2 },
    { programId: programs[3].id, name: 'Exchange Programs', displayOrder: 3 }
  ]);

  // Gallery Images
  await GalleryImage.bulkCreate([
    { title: 'Interactive Learning', description: 'Students engaged in collaborative learning activities', category: 'Academics', imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 0 },
    { title: 'Science Laboratory', description: 'Advanced experiments in our state-of-the-art lab', category: 'STEM', imageUrl: 'https://images.pexels.com/photos/8197530/pexels-photo-8197530.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 1 },
    { title: 'Athletic Excellence', description: 'Students competing in inter-school championships', category: 'Sports', imageUrl: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 2 },
    { title: 'Cultural Celebration', description: 'Annual cultural festival showcasing diverse talents', category: 'Arts', imageUrl: 'https://images.pexels.com/photos/8199166/pexels-photo-8199166.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 3 },
    { title: 'Art Workshop', description: 'Creative expression through visual arts', category: 'Arts', imageUrl: 'https://images.pexels.com/photos/8926549/pexels-photo-8926549.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 4 },
    { title: 'Technology Lab', description: 'Robotics and programming sessions', category: 'STEM', imageUrl: 'https://images.pexels.com/photos/6146962/pexels-photo-6146962.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 5 },
    { title: 'Library Study', description: 'Quiet study sessions in our modern library', category: 'Academics', imageUrl: 'https://images.pexels.com/photos/5427670/pexels-photo-5427670.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 6 },
    { title: 'Graduation Day', description: 'Celebrating academic achievements and milestones', category: 'Events', imageUrl: 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 7 },
    { title: 'Music Performance', description: 'Orchestra performance at the annual concert', category: 'Arts', imageUrl: 'https://images.pexels.com/photos/8199167/pexels-photo-8199167.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 8 },
    { title: 'Group Discussion', description: 'Collaborative learning and peer interaction', category: 'Academics', imageUrl: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 9 },
    { title: 'Drama Club', description: 'Theater rehearsal for the spring production', category: 'Arts', imageUrl: 'https://images.pexels.com/photos/8926551/pexels-photo-8926551.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 10 },
    { title: 'Basketball Team', description: 'Training session with our championship team', category: 'Sports', imageUrl: 'https://images.pexels.com/photos/7092616/pexels-photo-7092616.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', displayOrder: 11 }
  ]);

  // Featured Moments
  await FeaturedMoment.bulkCreate([
    { title: 'Science Fair Excellence', description: 'Our annual science fair brings together the brightest young minds to showcase innovative projects and groundbreaking research.', date: 'March 2025', imageUrl: 'https://images.pexels.com/photos/8197530/pexels-photo-8197530.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', stats: [{ emoji: '📅', text: 'March 2025' }, { emoji: '👥', text: '200+ Participants' }, { emoji: '🏆', text: '15 Awards' }], displayOrder: 0 },
    { title: 'Cultural Diversity Celebration', description: 'Our multicultural festival celebrates the rich diversity of our student body with performances, food, and exhibitions.', date: 'November 2024', imageUrl: 'https://images.pexels.com/photos/8199166/pexels-photo-8199166.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', stats: [{ emoji: '📅', text: 'November 2024' }, { emoji: '🌍', text: '25+ Countries' }, { emoji: '🎭', text: '30+ Performances' }], displayOrder: 1 }
  ]);

  // Staff Members
  await StaffMember.bulkCreate([
    { name: 'Dr. Robert Mitchell', title: 'Principal', badge: 'Principal', bio: 'With over 20 years in education, Dr. Mitchell brings a wealth of experience in academic leadership and student development.', imageInitials: 'DR', color: 'blue', displayOrder: 0 },
    { name: 'Ms. Sarah Thompson', title: 'Vice Principal', badge: 'Vice Principal', bio: 'Ms. Thompson oversees curriculum development and teacher training, ensuring our academic standards remain exceptional.', imageInitials: 'MS', color: 'green', displayOrder: 1 },
    { name: 'Mr. James Rodriguez', title: 'Academic Director', badge: 'Academic Director', bio: 'Mr. Rodriguez leads our academic programs and works closely with department heads to maintain educational excellence.', imageInitials: 'MR', color: 'purple', displayOrder: 2 }
  ]);

  // Core Values
  await CoreValue.bulkCreate([
    { title: 'Academic Excellence', description: 'We strive for the highest standards in teaching and learning, ensuring every student reaches their full potential.', icon: 'BookOpen', color: 'blue', displayOrder: 0 },
    { title: 'Compassion', description: 'We foster empathy, kindness, and understanding, creating a supportive community for all.', icon: 'Heart', color: 'red', displayOrder: 1 },
    { title: 'Integrity', description: 'We uphold the highest moral and ethical standards in all our interactions and decisions.', icon: 'Target', color: 'green', displayOrder: 2 },
    { title: 'Community', description: 'We believe in the power of collaboration and building strong relationships within our school family.', icon: 'Users', color: 'purple', displayOrder: 3 },
    { title: 'Innovation', description: 'We embrace new ideas, technologies, and teaching methods to enhance the learning experience.', icon: 'Award', color: 'amber', displayOrder: 4 },
    { title: 'Global Perspective', description: 'We prepare students to be global citizens who understand and appreciate diverse cultures.', icon: 'Globe', color: 'indigo', displayOrder: 5 }
  ]);

  // Facilities
  await Facility.bulkCreate([
    { name: 'Modern Classrooms', description: 'Smart boards and digital learning tools', icon: 'BookOpen', color: 'blue', displayOrder: 0 },
    { name: 'Science Labs', description: 'Fully equipped physics, chemistry, and biology labs', icon: 'Users', color: 'green', displayOrder: 1 },
    { name: 'Sports Complex', description: 'Indoor and outdoor sports facilities', icon: 'Award', color: 'purple', displayOrder: 2 },
    { name: 'Library', description: 'Extensive collection and digital resources', icon: 'Globe', color: 'amber', displayOrder: 3 }
  ]);

  // Students
  const students = await Student.bulkCreate([
    { name: 'Alex Sterling', grade: 'Grade 12', quote: 'Dummy School challenged me to think beyond limits and pursue my passion for STEM.', imageInitials: 'AS', color: 'blue', isFeatured: true, displayOrder: 0 },
    { name: 'Maya Chen', grade: 'Grade 11', quote: 'The research opportunities here have allowed me to contribute to real scientific discoveries.', imageInitials: 'MC', color: 'green', isFeatured: true, displayOrder: 1 },
    { name: 'Jordan Rivera', grade: 'Grade 10', quote: 'The arts program here has helped me find my creative voice and artistic identity.', imageInitials: 'JR', color: 'purple', isFeatured: true, displayOrder: 2 },
    { name: 'Sophia Williams', grade: 'Grade 12', quote: 'Leadership opportunities at Dummy School prepared me for making a difference in the world.', imageInitials: 'SW', color: 'amber', isFeatured: true, displayOrder: 3 },
    { name: 'Ethan Park', grade: 'Grade 11', quote: 'The music program here has nurtured my passion and helped me grow as a musician.', imageInitials: 'EP', color: 'red', isFeatured: true, displayOrder: 4 },
    { name: 'Isabella Martinez', grade: 'Grade 9', quote: 'Even as a freshman, I\'ve found incredible opportunities to explore my interests in technology.', imageInitials: 'IM', color: 'indigo', isFeatured: true, displayOrder: 5 }
  ]);

  // Student Achievements & Interests
  const achievementsData = [
    [['Valedictorian 2024', 'National Merit Scholar', 'MIT Acceptance'], ['Mathematics', 'Physics', 'Robotics']],
    [['Science Fair Winner', 'Research Publication', 'Intel Finalist'], ['Chemistry', 'Environmental Science', 'Research']],
    [['National Art Award', 'Gallery Exhibition', 'Design Competition'], ['Visual Arts', 'Digital Design', 'Photography']],
    [['Student Council President', 'Debate Champion', 'Harvard Acceptance'], ['Public Speaking', 'Politics', 'Community Service']],
    [['Orchestra Concertmaster', 'State Music Competition', 'Composition Award'], ['Classical Music', 'Composition', 'Music Theory']],
    [['Math Olympiad Medalist', 'Coding Competition Winner', 'App Developer'], ['Mathematics', 'Computer Science', 'App Development']]
  ];

  for (let i = 0; i < students.length; i++) {
    const [achievements, interests] = achievementsData[i];
    await StudentAchievement.bulkCreate(achievements.map((a, j) => ({ studentId: students[i].id, achievement: a, displayOrder: j })));
    await StudentInterest.bulkCreate(interests.map((int, j) => ({ studentId: students[i].id, interest: int, displayOrder: j })));
  }

  // Student Clubs
  const clubs = await StudentClub.bulkCreate([
    { name: 'Robotics Club', memberCount: 45, description: 'Building and programming robots for competitions', icon: 'Microscope', displayOrder: 0 },
    { name: 'Debate Society', memberCount: 32, description: 'Developing critical thinking and public speaking skills', icon: 'BookOpen', displayOrder: 1 },
    { name: 'Art Club', memberCount: 28, description: 'Exploring various forms of artistic expression', icon: 'Palette', displayOrder: 2 },
    { name: 'Music Ensemble', memberCount: 55, description: 'Orchestra, band, and choir performances', icon: 'Music', displayOrder: 3 },
    { name: 'Math Club', memberCount: 38, description: 'Advanced mathematics and problem-solving', icon: 'Calculator', displayOrder: 4 },
    { name: 'Environmental Club', memberCount: 42, description: 'Sustainability projects and environmental awareness', icon: 'Globe', displayOrder: 5 }
  ]);

  const clubAchievementsData = [
    ['Regional Champions 2024', 'National Qualifiers'],
    ['State Champions', 'National Tournament Participants'],
    ['Gallery Exhibitions', 'Community Art Projects'],
    ['State Music Festival', 'Concert Tours'],
    ['Math Olympiad Medals', 'Competition Winners'],
    ['Green School Certification', 'Community Gardens']
  ];
  for (let i = 0; i < clubs.length; i++) {
    await ClubAchievement.bulkCreate(clubAchievementsData[i].map((a, j) => ({ clubId: clubs[i].id, achievement: a, displayOrder: j })));
  }

  // Academic Terms
  const terms = await AcademicTerm.bulkCreate([
    { name: 'Fall Semester', season: 'Fall', startDate: 'August 15, 2025', endDate: 'December 20, 2025', description: 'Classes begin with orientation week', badgeColor: 'blue', displayOrder: 0 },
    { name: 'Winter Semester', season: 'Winter', startDate: 'January 8, 2026', endDate: 'May 25, 2026', description: 'Spring semester with major activities', badgeColor: 'green', displayOrder: 1 },
    { name: 'Summer Programs', season: 'Summer', startDate: 'June 1, 2026', endDate: 'July 30, 2026', description: 'Enrichment and remedial programs', badgeColor: 'amber', displayOrder: 2 }
  ]);

  await TermEvent.bulkCreate([
    { termId: terms[0].id, eventName: 'Orientation Week', dateRange: 'Aug 15-19', displayOrder: 0 },
    { termId: terms[0].id, eventName: 'Mid-term Exams', dateRange: 'Oct 15-22', displayOrder: 1 },
    { termId: terms[0].id, eventName: 'Parent-Teacher Conference', dateRange: 'Nov 10-12', displayOrder: 2 },
    { termId: terms[0].id, eventName: 'Final Exams', dateRange: 'Dec 10-17', displayOrder: 3 },
    { termId: terms[1].id, eventName: 'Classes Resume', dateRange: 'Jan 8', displayOrder: 0 },
    { termId: terms[1].id, eventName: 'Science Fair', dateRange: 'Feb 20-22', displayOrder: 1 },
    { termId: terms[1].id, eventName: 'Spring Break', dateRange: 'Mar 15-22', displayOrder: 2 },
    { termId: terms[1].id, eventName: 'Final Exams', dateRange: 'May 15-22', displayOrder: 3 },
    { termId: terms[2].id, eventName: 'Summer Camps', dateRange: 'Jun 1-15', displayOrder: 0 },
    { termId: terms[2].id, eventName: 'Remedial Classes', dateRange: 'Jun 15-Jul 15', displayOrder: 1 },
    { termId: terms[2].id, eventName: 'Advanced Learning', dateRange: 'Jul 1-30', displayOrder: 2 },
    { termId: terms[2].id, eventName: 'Teacher Training', dateRange: 'Jul 20-30', displayOrder: 3 }
  ]);

  // Calendar Events
  await CalendarEvent.bulkCreate([
    { title: 'Annual Science Fair 2025', description: 'Students showcase innovative projects in physics, chemistry, and biology.', date: 'April 15, 2025', startTime: '10:00 AM', endTime: '3:00 PM', location: 'Science Building', category: 'Academic', imageUrl: 'https://images.pexels.com/photos/8197530/pexels-photo-8197530.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop', badgeColor: 'blue', displayOrder: 0 },
    { title: 'Inter-House Sports Championship', description: 'Three days of competitive sports featuring all major athletic events.', date: 'April 20-22, 2025', startTime: '8:00 AM', endTime: '5:00 PM', location: 'Sports Complex', category: 'Sports', imageUrl: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop', badgeColor: 'green', displayOrder: 1 },
    { title: 'Spring Cultural Festival', description: 'A celebration of diversity through music, dance, and art performances.', date: 'May 10, 2025', startTime: '6:00 PM', endTime: '9:00 PM', location: 'Main Auditorium', category: 'Cultural', imageUrl: 'https://images.pexels.com/photos/8199166/pexels-photo-8199166.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop', badgeColor: 'purple', displayOrder: 2 },
    { title: 'Robotics Workshop Series', description: 'Hands-on robotics programming and design workshops for all levels.', date: 'April 25 - May 2, 2025', startTime: '3:30 PM', endTime: '5:30 PM', location: 'STEM Lab', category: 'Technology', imageUrl: 'https://images.pexels.com/photos/6146962/pexels-photo-6146962.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop', badgeColor: 'indigo', displayOrder: 3 },
    { title: 'Student Art Exhibition', description: 'Showcasing the creative talents of our students across all art forms.', date: 'May 15-20, 2025', startTime: '9:00 AM', endTime: '4:00 PM', location: 'Art Gallery', category: 'Arts', imageUrl: 'https://images.pexels.com/photos/8926549/pexels-photo-8926549.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop', badgeColor: 'pink', displayOrder: 4 },
    { title: 'Community Service Day', description: 'Students engage in meaningful community service projects throughout the city.', date: 'April 12, 2025', startTime: '9:00 AM', endTime: '3:00 PM', location: 'Various Locations', category: 'Community', imageUrl: 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop', badgeColor: 'green', displayOrder: 5 },
    // Past events
    { title: 'Winter Science Exhibition 2024', description: 'Over 200 students participated in our biggest science fair yet, showcasing innovative projects.', date: 'December 15, 2024', startTime: '10:00 AM', endTime: '4:00 PM', location: 'Science Building', category: 'Academic', imageUrl: 'https://images.pexels.com/photos/8197530/pexels-photo-8197530.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', isPast: true, displayOrder: 6 },
    { title: 'International Cultural Night', description: 'A spectacular evening celebrating our diverse student body with performances representing 25+ countries.', date: 'November 20, 2024', startTime: '6:00 PM', endTime: '10:00 PM', location: 'Main Auditorium', category: 'Cultural', imageUrl: 'https://images.pexels.com/photos/8199166/pexels-photo-8199166.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', isPast: true, displayOrder: 7 }
  ]);

  // Important Dates
  await ImportantDate.bulkCreate([
    { category: 'Examination Periods', eventName: 'Mid-term Exams', dateRange: 'Oct 15-22, 2025', displayOrder: 0 },
    { category: 'Examination Periods', eventName: 'Final Exams', dateRange: 'Dec 10-17, 2025', displayOrder: 1 },
    { category: 'Examination Periods', eventName: 'Spring Mid-terms', dateRange: 'Mar 5-12, 2026', displayOrder: 2 },
    { category: 'Examination Periods', eventName: 'Final Exams', dateRange: 'May 15-22, 2026', displayOrder: 3 },
    { category: 'Holiday Breaks', eventName: 'Fall Break', dateRange: 'Oct 5-8, 2025', displayOrder: 0 },
    { category: 'Holiday Breaks', eventName: 'Winter Break', dateRange: 'Dec 21 - Jan 7', displayOrder: 1 },
    { category: 'Holiday Breaks', eventName: 'Spring Break', dateRange: 'Mar 15-22, 2026', displayOrder: 2 },
    { category: 'Holiday Breaks', eventName: 'Summer Vacation', dateRange: 'May 26 - Aug 14', displayOrder: 3 },
    { category: 'Application Deadlines', eventName: 'Early Admission', dateRange: 'Nov 15, 2025', displayOrder: 0 },
    { category: 'Application Deadlines', eventName: 'Regular Admission', dateRange: 'Feb 1, 2026', displayOrder: 1 },
    { category: 'Application Deadlines', eventName: 'Transfer Students', dateRange: 'Apr 1, 2026', displayOrder: 2 },
    { category: 'Application Deadlines', eventName: 'Summer Programs', dateRange: 'May 1, 2026', displayOrder: 3 }
  ]);

  // School Info
  await SchoolInfo.create({
    name: 'Dummy School',
    address: '123 Education Lane, Learning City, LC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@harmonyacademy.edu',
    officeHours: 'Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM',
    foundedYear: 1985,
    studentCount: 2500,
    description: 'Excellence in education since 1985. Nurturing minds, building futures, and creating tomorrow\'s leaders.',
    footerTagline: 'Excellence in education since 1985. Nurturing minds, building futures, and creating tomorrow\'s leaders.',
    socialLinks: { facebook: '#', twitter: '#', instagram: '#', youtube: '#' }
  });

  // Departments
  await Department.bulkCreate([
    { name: 'Admissions Office', description: 'Questions about enrollment, applications, and requirements', email: 'admissions@harmonyacademy.edu', phone: '+1 (555) 123-4567', phoneExtension: '101', color: 'blue', displayOrder: 0 },
    { name: 'Academic Affairs', description: 'Curriculum, grades, transcripts, and academic programs', email: 'academics@harmonyacademy.edu', phone: '+1 (555) 123-4567', phoneExtension: '102', color: 'green', displayOrder: 1 },
    { name: 'Student Services', description: 'Counseling, support services, and student activities', email: 'students@harmonyacademy.edu', phone: '+1 (555) 123-4567', phoneExtension: '103', color: 'purple', displayOrder: 2 },
    { name: 'Finance Office', description: 'Tuition, fees, scholarships, and financial aid', email: 'finance@harmonyacademy.edu', phone: '+1 (555) 123-4567', phoneExtension: '104', color: 'amber', displayOrder: 3 },
    { name: 'Athletics', description: 'Sports programs, competitions, and physical education', email: 'athletics@harmonyacademy.edu', phone: '+1 (555) 123-4567', phoneExtension: '105', color: 'red', displayOrder: 4 },
    { name: 'Technology Support', description: 'IT support, online learning, and technical assistance', email: 'tech@harmonyacademy.edu', phone: '+1 (555) 123-4567', phoneExtension: '106', color: 'indigo', displayOrder: 5 }
  ]);

  // Overview Items
  await OverviewItem.bulkCreate([
    { section: 'academic', text: 'Rigorous curriculum aligned with international standards', displayOrder: 0 },
    { section: 'academic', text: 'Advanced Placement (AP) courses in 15+ subjects', displayOrder: 1 },
    { section: 'academic', text: 'STEM-focused programs with hands-on learning', displayOrder: 2 },
    { section: 'academic', text: 'Multilingual education with 5 language options', displayOrder: 3 },
    { section: 'academic', text: 'Research opportunities and science fair participation', displayOrder: 4 },
    { section: 'studentLife', text: '50+ clubs and extracurricular activities', displayOrder: 0 },
    { section: 'studentLife', text: 'Competitive sports teams in 12 different sports', displayOrder: 1 },
    { section: 'studentLife', text: 'Arts programs including music, theater, and visual arts', displayOrder: 2 },
    { section: 'studentLife', text: 'Student government and leadership opportunities', displayOrder: 3 },
    { section: 'studentLife', text: 'Community service and volunteer programs', displayOrder: 4 }
  ]);

  // Event Categories
  const eventCats = await EventCategory.bulkCreate([
    { name: 'Academic Events', description: 'Science fairs, math competitions, debate tournaments, and academic showcases', icon: 'Users', color: 'blue', displayOrder: 0 },
    { name: 'Sports & Athletics', description: 'Inter-house competitions, tournaments, and physical fitness events', icon: 'Users', color: 'green', displayOrder: 1 },
    { name: 'Cultural Programs', description: 'Music, dance, theater, and art celebrations throughout the year', icon: 'Users', color: 'purple', displayOrder: 2 },
    { name: 'Special Events', description: 'Graduation, fundraisers, guest speakers, and community outreach', icon: 'Users', color: 'amber', displayOrder: 3 }
  ]);

  const catItemsData = [
    ['Science Fair', 'Debate Competition', 'Math Olympiad', 'Research Symposium'],
    ['Annual Sports Day', 'Basketball Tournament', 'Track & Field', 'Swimming Gala'],
    ['Cultural Festival', 'Art Exhibition', 'Music Concert', 'Drama Performance'],
    ['Graduation Ceremony', 'Career Day', 'Alumni Meet', 'Fundraising Gala']
  ];
  for (let i = 0; i < eventCats.length; i++) {
    await EventCategoryItem.bulkCreate(catItemsData[i].map((name, j) => ({ categoryId: eventCats[i].id, name, displayOrder: j })));
  }

  console.log('\nSeed completed successfully!');
  console.log('Admin login: username=admin, password=admin123');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
