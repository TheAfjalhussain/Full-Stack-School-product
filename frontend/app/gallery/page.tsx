'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Download, Share2, Heart } from 'lucide-react';
import { useApi } from '@/hooks/use-api';
import { api, getImageUrl } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  altText: string;
  isFeatured: boolean;
}

interface FeaturedMoment {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  stats: { emoji: string; text: string }[];
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: schoolInfo } = useApi(() => api.getSchoolInfo(), []);
  const schoolName = schoolInfo?.name || 'Our School';

  const { data: galleryImages, loading: galleryLoading, error: galleryError } = useApi<GalleryImage[]>(
    () => api.getGalleryImages(selectedCategory),
    [selectedCategory]
  );

  const { data: featuredMoments, loading: momentsLoading, error: momentsError } = useApi<FeaturedMoment[]>(
    () => api.getFeaturedMoments(),
    []
  );

  const categories = ["All", "Academics", "STEM", "Sports", "Arts", "Events"];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className=" bg-blue-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Camera className="h-12 w-12 text-white mx-auto mb-4 opacity-80" />
          <h1 className="text-5xl text-white font-bold font-playfair mb-4">Student Life Gallery</h1>
          <p className="text-xl text-gray-200 opacity-90">Capturing moments of learning, growth, and achievement at {schoolName}</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={
                  selectedCategory === category
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'hover:bg-blue-600 hover:text-white transition-colors'
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {galleryLoading ? (
            <LoadingSpinner text="Loading gallery..." />
          ) : galleryError ? (
            <div className="text-center py-20 text-red-500">
              <p>Failed to load gallery images. Please try again later.</p>
            </div>
          ) : galleryImages && galleryImages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {galleryImages.map((image) => (
                <Card key={image.id} className="hover-lift overflow-hidden group border-4 border-orange-600 p-2">
                  <div className="relative h-64 border-4 ">
                    <Image
                      src={getImageUrl(image.imageUrl)}
                      alt={image.altText || image.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    </div>
                    <Badge className="absolute top-4 left-4 bg-blue-600">{image.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    <p className=" text-sm">{image.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>No images found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Moments */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold font-playfair text-blue-900 mb-12 text-center">Featured Moments</h2>

          {momentsLoading ? (
            <LoadingSpinner text="Loading featured moments..." />
          ) : momentsError ? (
            <div className="text-center py-12 text-red-500">
              <p>Failed to load featured moments. Please try again later.</p>
            </div>
          ) : featuredMoments && featuredMoments.length > 0 ? (
            featuredMoments.map((moment, index) => (
              <div
                key={moment.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index < featuredMoments.length - 1 ? 'mb-16' : ''}`}
              >
                {/* Text block */}
                <div className={index % 2 !== 0 ? 'order-1 lg:order-2' : ''}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{moment.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{moment.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {(Array.isArray(moment.stats)
                      ? moment.stats
                      : typeof moment.stats === 'string'
                        ? JSON.parse(moment.stats)
                        : []
                    ).map((stat: { emoji: string; text: string }, statIndex: number) => (
                      <span key={statIndex}>
                        {stat.emoji} {stat.text}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Image block */}
                <div className={`relative h-80 ${index % 2 !== 0 ? 'order-2 lg:order-1' : ''}`}>
                  <Image
                    src={getImageUrl(moment.imageUrl)}
                    alt={moment.title}
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No featured moments available.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
