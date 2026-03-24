'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { useApi } from '@/hooks/use-api';
import { api, getImageUrl } from '@/lib/api';
import { getIcon } from '@/lib/icon-map';
import LoadingSpinner from '@/components/LoadingSpinner';
import beyond from '@/public/images/beyon.png'

export default function EventsPage() {
  const { data: stats, loading: statsLoading } = useApi(() => api.getStatistics('events'), []);
  const { data: calendarEvents, loading: eventsLoading } = useApi(() => api.getCalendarEvents(), []);
  const { data: eventCategories, loading: categoriesLoading } = useApi(() => api.getEventCategories(), []);

  const isLoading = statsLoading || eventsLoading || categoriesLoading;

  const upcomingEvents = calendarEvents?.filter((e: any) => !e.isPast) || [];
  const pastEvents = calendarEvents?.filter((e: any) => e.isPast) || [];

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <LoadingSpinner text="Loading events..." />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-blue-950 py-16">
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-playfair mb-4">Events & Activities</h1>
          <p className="text-xl opacity-90">Discover the vibrant life at our school</p>
        </div>
      </section>

      {/* About Events & Activities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-6">
                Enriching Student Life
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that learning extends beyond the classroom. Our diverse
                range of events and activities provides students with opportunities to explore their
                interests, develop new skills, and create lasting memories.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From academic competitions and cultural festivals to sports tournaments and community
                service projects, there is something for everyone to participate in and enjoy.
              </p>
              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat: any, index: number) => {
                    const colors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-amber-600'];
                    return (
                      <div key={stat._id || index} className="text-center">
                        <div className={`text-3xl font-bold ${stat.color || colors[index % colors.length]} mb-2`}>
                          {stat.value}
                        </div>
                        <p className="text-gray-600">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="relative">
              <Image
                src={beyond}
                alt="Students studying in classroom"
                width={600}
                height={450}
                priority
                className="rounded-2xl shadow-2xl w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 bg-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-playfair text-blue-900 mb-12 text-center">Upcoming Events</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event: any, index: number) => (
                <Card key={event._id || index} className="hover-lift p-2 border-4 border-blue-900">
                  {event.image && (
                    <div className="relative h-48">
                      <Image
                        src={getImageUrl(event.image)}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      {event.category && (
                        <Badge className={`absolute top-4 left-4 ${event.badgeColor || 'bg-blue-600'}`}>
                          {event.category}
                        </Badge>
                      )}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
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
                    {event.description && (
                      <p className="text-gray-600">{event.description}</p>
                    )}
                    <Button className="w-full mt-4">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Event Categories */}
      {eventCategories && eventCategories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-12 text-center">Event Categories</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {eventCategories.map((category: any, index: number) => {
                const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-amber-100'];
                const textColors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-amber-600'];
                const IconComponent = category.icon ? getIcon(category.icon) : Users;
                return (
                  <Card key={category._id || index} className="text-center hover-lift">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 ${category.bgColor || bgColors[index % bgColors.length]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`h-8 w-8 ${category.iconColor || textColors[index % textColors.length]}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                      {category.items && category.items.length > 0 && (
                        <ul className="text-sm text-gray-500 space-y-1">
                          {category.items.map((item: any, itemIndex: number) => (
                            <li key={itemIndex}>&#8226; {item.name}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Past Events Highlights */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-12 text-center">Recent Event Highlights</h2>

            {pastEvents.map((event: any, index: number) => (
              <div
                key={event._id || index}
                className={`grid md:grid-cols-2 gap-12 items-center ${index < pastEvents.length - 1 ? 'mb-16' : ''}`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="space-y-2 text-sm">
                        {event.date && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span>{event.date}</span>
                          </div>
                        )}
                        {event.attendees && (
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span>{event.attendees}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {event.image && (
                      <div className="relative h-64 md:h-80">
                        <Image
                          src={getImageUrl(event.image)}
                          alt={event.title}
                          fill
                          className="object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {event.image && (
                      <div className="order-2 md:order-1 relative h-64 md:h-80">
                        <Image
                          src={getImageUrl(event.image)}
                          alt={event.title}
                          fill
                          className="object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                    <div className="order-1 md:order-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="space-y-2 text-sm">
                        {event.date && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span>{event.date}</span>
                          </div>
                        )}
                        {event.attendees && (
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-purple-600" />
                            <span>{event.attendees}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
