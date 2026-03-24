'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useApi } from '@/hooks/use-api';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

const badgeColors = [
  'bg-blue-600',
  'bg-green-600',
  'bg-amber-600',
  'bg-purple-600',
  'bg-red-600',
  'bg-indigo-600',
];

const iconColors = [
  'text-blue-600',
  'text-green-600',
  'text-amber-600',
  'text-purple-600',
  'text-red-600',
  'text-indigo-600',
];

export default function AgendaPage() {
  const { data: terms, loading: termsLoading } = useApi(() => api.getAcademicTerms(), []);
  const { data: upcomingEvents, loading: eventsLoading } = useApi(() => api.getCalendarEvents(true), []);
  const { data: importantDates, loading: datesLoading } = useApi(() => api.getImportantDates(), []);

  const isLoading = termsLoading || eventsLoading || datesLoading;

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <LoadingSpinner text="Loading academic agenda..." />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold font-playfair mb-4">Academic Agenda</h1>
          <p className="text-xl opacity-90">Stay updated with our academic calendar and important events</p>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-8 text-center">Academic Year 2025-2026</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {terms?.map((term: any, index: number) => (
              <Card key={term._id || index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge className={`mr-3 ${term.badgeColor || badgeColors[index % badgeColors.length]}`}>
                      {term.badge || `Term ${index + 1}`}
                    </Badge>
                    {term.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className={`h-5 w-5 ${term.iconColor || iconColors[index % iconColors.length]} mt-1`} />
                    <div>
                      <p className="font-semibold">{term.dateRange}</p>
                      <p className="text-sm text-gray-600">{term.description}</p>
                    </div>
                  </div>

                  {term.events && term.events.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">{term.eventsLabel || 'Key Events:'}</h4>
                      <div className="space-y-2 text-sm">
                        {term.events.map((event: any, eventIndex: number) => (
                          <div key={eventIndex} className="flex justify-between">
                            <span>{event.eventName}</span>
                            <span className="text-gray-600">{event.dateRange}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-100 z-99">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-playfair text-blue-900 mb-8 text-center">Upcoming Events</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents?.map((event: any, index: number) => (
              <Card key={event._id || index} className="hover-lift bg-blue-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{event.title}</CardTitle>
                    {event.category && (
                      <Badge className={event.badgeClass || 'bg-green-100 text-green-800'}>
                        {event.category}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {event.date && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                  )}
                  {event.time && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.attendees && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees}</span>
                    </div>
                  )}
                  {event.description && (
                    <p className="text-gray-600">{event.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-8 text-center">Important Academic Dates</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {importantDates?.map((group: any, index: number) => (
              <Card key={group._id || index}>
                <CardHeader>
                  <CardTitle className="text-lg">{group.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {group.dates?.map((item: any, dateIndex: number) => (
                    <div key={dateIndex} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-gray-600">{item.dateRange}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
