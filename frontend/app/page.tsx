'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { getIcon } from '@/lib/icon-map';
import { api, getImageUrl } from '@/lib/api';
import { useApi } from '@/hooks/use-api';
import LoadingSpinner from '@/components/LoadingSpinner';
import batch from '@/public/images/RKmissionHeroImag..png';
import acadimic from '@/public/images/class2.png';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
}

function Counter({ end, duration, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = 0;
    let rafId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(animateCount);
      }
    };

    rafId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(rafId);
  }, [end, duration]);

  return (
    <span className="animate-count-up">
      {count}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: heroSliders } = useApi(() => api.getHeroSliders(), []);
  const { data: stats } = useApi(() => api.getStatistics('home'), []);
  const { data: testimonials } = useApi(() => api.getTestimonials(), []);
  const { data: whyChooseFeatures } = useApi(() => api.getFeatures('whyChoose'), []);
  const { data: missionFeatures } = useApi(() => api.getFeatures('mission'), []);
  const { data: whoShouldApply } = useApi(() => api.getFeatures('whoShouldApply'), []);
  const { data: aboutHighlights } = useApi(() => api.getFeatures('aboutHighlight'), []);
  const { data: programs } = useApi(() => api.getPrograms(), []);
  const { data: galleryImages } = useApi(() => api.getGalleryImages(), []);
  const { data: academicItems } = useApi(() => api.getOverviewItems('academic'), []);
  const { data: studentLifeItems } = useApi(() => api.getOverviewItems('studentLife'), []);
  const { data: schoolInfo } = useApi(() => api.getSchoolInfo(), []);

  const schoolName = schoolInfo?.name || 'Our School';

  // ✅ FIXED loading logic
  const isLoading =
    !heroSliders ||
    !stats ||
    !testimonials ||
    !whyChooseFeatures ||
    !missionFeatures ||
    !whoShouldApply ||
    !aboutHighlights ||
    !programs ||
    !galleryImages ||
    !academicItems ||
    !studentLifeItems ||
    !schoolInfo;

  useEffect(() => {
    if (!testimonials?.length) return;

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials]);

  useEffect(() => {
    if (!heroSliders?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSliders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroSliders]);

  if (isLoading) {
    return (
      <div className="pt-20">
        <LoadingSpinner text="Loading page..." />
      </div>
    );
  }

  const images = heroSliders || [];
  const currentImage = images[currentIndex];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[98vh] flex items-center justify-start overflow-hidden">
         {/* Background */}
        <div className="absolute inset-0">
          {currentImage && (
            <Image
              src={getImageUrl(currentImage.imageUrl)}
              alt="Hero"
              fill
              priority
              className="object-cover object-center scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              {currentImage?.title || schoolName}
            </h1>
      
            <p className="text-lg text-gray-200 mb-8">
              {currentImage?.subtitle || "Shaping future leaders through excellence in education."}
            </p>
      
            <div className="flex gap-4 flex-wrap">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                {currentImage?.buttonText || 'Apply for Admission'} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
       <section className="py-16 bg-blue-950 text-white">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
           {(stats || []).map((stat: any, i: number) => (
             <div key={i} className="space-y-2">
               <h3 className="text-4xl font-bold text-amber-400">
                 <Counter end={stat.value} duration={2000} suffix={stat.suffix} />
               </h3>
               <p className="text-gray-300 text-sm">{stat.label}</p>
             </div>
           ))}
         </div>
       </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-3xl font-bold font-playfair text-gray-900 mb-6">About {schoolName}</h2>
              <p className="text-md text-gray-600 mb-6 leading-relaxed">
                {schoolInfo?.description || `For over 25 years, ${schoolName} has been at the forefront of educational excellence, shaping young minds and preparing students for a bright future.`}
              </p>
              <p className="text-md text-gray-600 mb-8 leading-relaxed">
                We believe in nurturing not just academic brilliance but also character, creativity, and critical thinking.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {(aboutHighlights || []).map((feature: any, i: number) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div key={i} className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 text-${feature.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Know More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
             <div className="relative animate-fade-in-up">
               <Image
                 src={batch}
                 alt="Students studying in classroom"
                 width={500}
                 height={450}
                 priority
                 className="rounded-2xl shadow-2xl w-full h-auto"
               />
             </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our School */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">Why Choose {schoolName}?</h2>
            <p className="text-xl text-gray-600">Discover what makes us the preferred choice for quality education</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(whyChooseFeatures || []).map((feature: any, i: number) => {
              const Icon = getIcon(feature.icon);
              return (
                <Card key={i} className="hover-lift text-center hover:bg-gray-100">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 text-${feature.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* School Overview */}
      <section className="py-20 bg-gradient-to-br from-sky-100 to-indigo-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-blue-900 mb-4">School Overview</h2>
            <p className="text-xl text-gray-600">A comprehensive look at our educational ecosystem</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Academic Excellence</h3>
              <div className="space-y-4">
                {(academicItems || []).map((item: any, i: number) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="relative animate-fade-in-up">
                <Image
                  src={acadimic}
                  alt="Students studying in classroom"
                  width={600}
                  height={450}
                  priority
                  className="rounded-2xl shadow-2xl w-full h-[400px]"
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <Image src="https://lgisdehradun.com/wp-content/uploads/2025/07/1.jpg" alt="Student life" width={600} height={450} className="rounded-2xl shadow-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Life & Activities</h3>
              <div className="space-y-4">
                {(studentLifeItems || []).map((item: any, i: number) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">Learning Programs</h2>
            <p className="text-xl text-gray-600">Comprehensive educational pathways for every student</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(programs || []).map((program: any, i: number) => {
              const Icon = getIcon(program.icon);
              return (
                <Card key={i} className="hover-lift text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-${program.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 text-${program.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{program.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {(program.subjects || []).map((sub: any, j: number) => (
                        <li key={j}>• {sub.name}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Image Gallery Preview */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">Student Life Gallery</h2>
            <p className="text-xl text-gray-600">Capturing moments of learning, growth, and achievement</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {(galleryImages || []).slice(0, 8).map((img: any, i: number) => (
              <div key={i} className="relative h-48 hover-lift">
                <Image src={getImageUrl(img.imageUrl)} alt={img.title || 'Gallery'} fill className="object-cover rounded-lg" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="bg-transparent">
              View All Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-8">Our Mission</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
            To provide a nurturing environment where every student can discover their potential, develop critical thinking skills, and become confident, compassionate leaders.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {(missionFeatures || []).map((feature: any, i: number) => {
              const Icon = getIcon(feature.icon);
              return (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover-lift border hover:bg-gray-100">
                  <Icon className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="opacity-80">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="py-20 bg-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">Who Should Apply?</h2>
            <p className="text-xl text-gray-600">{schoolName} welcomes students who are ready to excel</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(whoShouldApply || []).map((feature: any, i: number) => {
              const Icon = getIcon(feature.icon);
              return (
                <div key={i} className="text-center bg-white rounded-xl p-8 shadow-lg hover-lift">
                  <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-8 w-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Hear from students, parents, and alumni</p>
          </div>
          {testimonials && testimonials.length > 0 && (
            <div className="relative max-w-4xl mx-auto">
              <Card className="hover-lift">
                <CardContent className="p-12 text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-600 mb-8 italic leading-relaxed">
                    &ldquo;{testimonials[currentTestimonial]?.content}&rdquo;
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold text-lg">
                        {testimonials[currentTestimonial]?.imageInitials}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-lg">{testimonials[currentTestimonial]?.name}</p>
                      <p className="text-gray-500">{testimonials[currentTestimonial]?.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_: any, index: number) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
