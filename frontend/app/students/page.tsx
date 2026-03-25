'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Award,
  BookOpen,
  Trophy,
  Star,
  GraduationCap,
  Target,
  Heart,
  Globe,
  Lightbulb,
} from 'lucide-react';
import { useApi } from '@/hooks/use-api';
import { api } from '@/lib/api';
import { getIcon } from '@/lib/icon-map';
import LoadingSpinner from '@/components/LoadingSpinner';
import outofclass from '@/public/images/beyon.png'
import classimg from '@/public/images/classromm.png'

export default function StudentsPage() {
  const { data: students, loading: studentsLoading, error: studentsError } = useApi(() => api.getStudents(), []);
  const { data: clubs, loading: clubsLoading, error: clubsError } = useApi(() => api.getStudentClubs(), []);
  const { data: statistics, loading: statsLoading, error: statsError } = useApi(() => api.getStatistics('students'), []);
  const { data: schoolInfo } = useApi(() => api.getSchoolInfo(), []);
  const schoolName = schoolInfo?.name || 'Our School';

  const loading = studentsLoading || clubsLoading || statsLoading;
  const error = studentsError || clubsError || statsError;

  if (loading) return <div className="pt-16"><LoadingSpinner text="Loading student information..." /></div>;
  if (error) return <div className="pt-16 text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-blue-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-5xl font-bold font-playfair mb-4">Our Students</h1>
          <p className="text-xl opacity-90">Meet the bright minds that make {schoolName} exceptional</p>
        </div>
      </section>

      {/* Student Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics && statistics.map((stat: any) => (
              <div key={stat.id} className="hover-lift">
                <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Students */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-playfair text-blue-900 mb-4">Student Spotlight</h2>
            <p className="text-xl text-gray-600">Celebrating our outstanding students and their achievements</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students && students.map((student: any) => (
              <Card key={student.id} className="hover-lift border-2 border-blue-900 rounded-xl hover:bg-blue-900 hover:text-white">
                <CardContent className="p-8 text-center">
                  <div className={`w-24 h-24 bg-${student.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className={`text-2xl font-bold text-${student.color}-600`}>{student.imageInitials}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
                  <Badge className="mb-4">{student.grade}</Badge>

                  <div className="mb-4">
                    <h4 className="font-semibold  mb-2">Achievements</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {student.achievements.map((item: any, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {item.achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold  mb-2">Interests</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {student.interests.map((item: any, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {item.interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm italic"> {student.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-4">Student Life at {schoolName}</h2>
            <p className="text-xl text-gray-600">A vibrant community where students thrive academically and personally</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Academic Excellence</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Rigorous curriculum with 20+ AP courses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Personalized learning plans for every student</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-purple-600" />
                  </div>
                  <span>Research opportunities with faculty mentors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>National competition participation and awards</span>
                </div>
              </div>
            </div>
            <div className="relative h-80">
              <Image
                src={outofclass}
                alt="Students studying in classroom"
                width={600}
                height={450}
                priority
                className="rounded-2xl shadow-2xl w-full h-[400px]"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-80">
              <Image
                  src={classimg}
                  alt="Students studying in classroom"
                  width={600}
                  height={450}
                  priority
                  className="rounded-2xl shadow-2xl w-full h-[400px]"
                />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Beyond the Classroom</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-red-600" />
                  </div>
                  <span>50+ clubs and extracurricular activities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Student government and leadership roles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Globe className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Community service and volunteer opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <span>Cultural events and international exchanges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Clubs */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-4">Student Clubs & Organizations</h2>
            <p className="text-xl text-gray-600">Discover your passion and connect with like-minded peers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs && clubs.map((club: any) => {
              const IconComponent = getIcon(club.icon);
              return (
                <Card key={club.id} className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{club.name}</CardTitle>
                        <p className="text-sm text-gray-500">{club.memberCount} members</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{club.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Recent Achievements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {club.achievements.map((item: any, i: number) => (
                          <li key={i}>• {item.achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>


    </div>
  );
}
