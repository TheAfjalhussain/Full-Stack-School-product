const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function getImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = API_BASE_URL.replace('/api', '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

export const api = {
  getHeroSliders: () => fetchAPI<any[]>('/hero-sliders'),
  getStatistics: (page: string) => fetchAPI<any[]>(`/statistics?page=${page}`),
  getTestimonials: () => fetchAPI<any[]>('/testimonials'),
  getFeatures: (section: string) => fetchAPI<any[]>(`/features?section=${section}`),
  getPrograms: () => fetchAPI<any[]>('/programs'),
  getGalleryImages: (category?: string) => fetchAPI<any[]>(`/gallery-images${category && category !== 'All' ? `?category=${category}` : ''}`),
  getFeaturedMoments: () => fetchAPI<any[]>('/featured-moments'),
  getStaffMembers: () => fetchAPI<any[]>('/staff-members'),
  getCoreValues: () => fetchAPI<any[]>('/core-values'),
  getFacilities: () => fetchAPI<any[]>('/facilities'),
  getStudents: (featured?: boolean) => fetchAPI<any[]>(`/students${featured ? '?featured=true' : ''}`),
  getStudentClubs: () => fetchAPI<any[]>('/student-clubs'),
  getAcademicTerms: () => fetchAPI<any[]>('/academic-terms'),
  getCalendarEvents: (upcoming?: boolean) => fetchAPI<any[]>(`/calendar-events${upcoming ? '?upcoming=true' : ''}`),
  getImportantDates: () => fetchAPI<any[]>('/important-dates'),
  getSchoolInfo: () => fetchAPI<any>('/school-info'),
  getDepartments: () => fetchAPI<any[]>('/departments'),
  getEventCategories: () => fetchAPI<any[]>('/event-categories'),
  getOverviewItems: (section: string) => fetchAPI<any[]>(`/overview-items?section=${section}`),
  submitContact: (data: { name: string; email: string; subject: string; message: string }) =>
    fetchAPI<any>('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
