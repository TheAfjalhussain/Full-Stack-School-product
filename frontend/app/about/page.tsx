'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApi } from '@/hooks/use-api';
import { api, getImageUrl } from '@/lib/api';
import { getIcon } from '@/lib/icon-map';
import LoadingSpinner from '@/components/LoadingSpinner';
import batchimg from "@/public/images/batc-removebg-preview.png"
import soni from '@/public/images/soni-si..png'

export default function AboutPage() {
  const { data: coreValues, loading: loadingValues } = useApi(() => api.getCoreValues(), []);
  const { data: staffMembers, loading: loadingStaff } = useApi(() => api.getStaffMembers(), []);
  const { data: facilities, loading: loadingFacilities } = useApi(() => api.getFacilities(), []);
  const { data: schoolInfo } = useApi(() => api.getSchoolInfo(), []);
  const schoolName = schoolInfo?.name || 'Our School';

  const isLoading = loadingValues || loadingStaff || loadingFacilities;

  if (isLoading) {
    return (
      <div className="pt-20">
        <LoadingSpinner text="Loading about page..." />
      </div>
    );
  }


  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-blue-950 text-white py-16">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-2xl md:text-5xl font-bold font-playfair mb-4">About {schoolName}</h1>
          <p className="text-xl opacity-90">Discover our story, values, and commitment to educational excellence</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                R.K. Mission School was established in{schoolInfo?.foundedYear || '1985'}, to deliver high-quality, affordable English-medium education to families in and around Nawada.
                 The school’s focus is to develop children’s dignity, personality and academic excellence while preparing them for mainstream 
                 competitive schools such as Navodaya, Sainik, Simultala and BHU.
                  The prospectus emphasizes character formation alongside scholastic achievement and community support 
                  for disadvantaged but meritorious students.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our founders believed that education should be holistic, preparing students not just for exams
                but for life. This philosophy continues to guide us today as we blend traditional values with
                modern teaching methodologies.
              </p>

            </div>
            <div className="relative">
              <Image
                 src={batchimg}
                 alt="Students studying in classroom"
                 width={600}
                 height={450}
                 priority
                 className="rounded-2xl shadow-2xl w-full h-[400px] md:h-[500px]"
               />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Managing Director Message
          </h2>
          <p className="text-gray-600 mt-2">
            A vision for quality education and student success
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-xl p-6 md:p-10">

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                 src={soni}
                 alt="Students studying in classroom"
                 width={600}
                 height={450}
                 priority
                 className="rounded-2xl shadow-2xl w-full h-auto"
               />
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-2">
              Ramchandra Kr Soni
            </h3>
            <p className="text-orange-600 font-medium mb-4">
              Managing Director
            </p>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              At R.K. Mission School, our goal is to provide quality education that builds strong character, discipline, and knowledge. 
              We believe every child has the potential to succeed, and we are committed to nurturing their talents through modern teaching methods, 
              co-curricular activities, and a positive learning environment.
              
              Our mission is not just academic excellence but also to prepare students for life challenges with confidence and values.
            </p>

            {/* Signature */}
            <div className="mt-6">
              <p className="font-semibold text-gray-800">
                — Ramchandra Kr Soni
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues?.map((value) => {
              const IconComponent = getIcon(value.icon);
              return (
                <Card key={value.id} className="text-center hover-lift">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`h-8 w-8 text-${value.color}-600`} />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-playfair text-blue-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-800">Meet the dedicated professionals leading our school</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers?.map((member) => (
              <Card key={member.id} className="text-center bottom-2 z-10 border-4 border-blue-900 rounded-2xl hover:bg-blue-900 hover:text-gray-200">
                <CardContent className="p-12">
                  <div className={`w-32 h-32 bg-${member.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <span className={`text-3xl font-bold text-${member.color}-600`}>{member.imageInitials}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge className="mb-4">{member.badge}</Badge>
                  <p className=" text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-playfair text-gray-900 mb-4">World-Class Facilities</h2>
            <p className="text-xl text-gray-600">State-of-the-art infrastructure supporting excellence in education</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities?.map((facility) => {
              const IconComponent = getIcon(facility.icon);
              return (
                <div key={facility.id} className="bg-white rounded-xl p-6 shadow-lg hover-lift text-center">
                  <div className={`w-16 h-16 bg-${facility.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 text-${facility.color}-600`} />
                  </div>
                  <h3 className="font-semibold mb-2">{facility.name}</h3>
                  <p className="text-sm text-gray-600">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
