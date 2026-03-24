'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useApi } from '@/hooks/use-api';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ContactPage() {
  const { data: schoolInfo, loading: infoLoading } = useApi(() => api.getSchoolInfo(), []);
  const { data: departments, loading: deptsLoading } = useApi(() => api.getDepartments(), []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.submitContact(formData);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      alert('Thank you for your message! We will get back to you soon.');
    } catch (error: any) {
      alert(error.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = infoLoading || deptsLoading;

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <LoadingSpinner text="Loading contact information..." />
      </div>
    );
  }

  const deptColors = [
    { bg: 'bg-blue-100', text: 'text-blue-600', accent: 'text-blue-600' },
    { bg: 'bg-green-100', text: 'text-green-600', accent: 'text-green-600' },
    { bg: 'bg-purple-100', text: 'text-purple-600', accent: 'text-purple-600' },
    { bg: 'bg-amber-100', text: 'text-amber-600', accent: 'text-amber-600' },
    { bg: 'bg-red-100', text: 'text-red-600', accent: 'text-red-600' },
    { bg: 'bg-indigo-100', text: 'text-indigo-600', accent: 'text-indigo-600' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold font-playfair mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">Get in touch with {schoolInfo?.name || 'us'}</p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-6">Get In Touch</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We'd love to hear from you. Whether you have questions about admissions,
                  programs, or would like to schedule a visit, our team is here to help.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Address</h3>
                        <p className="text-gray-600">{schoolInfo?.address || 'Address not available'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Phone</h3>
                        <p className="text-gray-600">{schoolInfo?.phone || 'Phone not available'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600">{schoolInfo?.email || 'Email not available'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Office Hours</h3>
                        {schoolInfo?.officeHours ? (
                          Array.isArray(schoolInfo.officeHours) ? (
                            schoolInfo.officeHours.map((hours: string, index: number) => (
                              <p key={index} className="text-gray-600">{hours}</p>
                            ))
                          ) : (
                            <p className="text-gray-600">{schoolInfo.officeHours}</p>
                          )
                        ) : (
                          <>
                            <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                            <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form - Embedded or Built-in */}
            {schoolInfo?.contactFormEmbed ? (
              <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                <div dangerouslySetInnerHTML={{ __html: schoolInfo.contactFormEmbed }} />
              </div>
            ) : (
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="What is your inquiry about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <Button type="submit" className="w-full text-white bg-blue-900 hover:bg-blue-950" disabled={submitting}>
                      <Send className="h-4 w-4 mr-2" />
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      {departments && departments.length > 0 && (
        <section className="py-20 bg-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-playfair text-blue-900 mb-12 text-center">Department Contacts</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept: any, index: number) => {
                const color = deptColors[index % deptColors.length];
                return (
                  <Card key={dept._id || index} className="text-center hover-lift bg-white border-blue-900">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 ${dept.bgColor || color.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Mail className={`h-8 w-8 ${dept.iconColor || color.text}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{dept.description}</p>
                      <p className={`${dept.accentColor || color.accent} font-medium`}>{dept.email}</p>
                      <p className="text-gray-500">{dept.phone}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-12 text-center">Find Us</h2>

          <Card className="overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Interactive Map</h3>
                <p className="text-gray-500">{schoolInfo?.address || 'Address not available'}</p>
                <Button className="mt-4" variant="outline">
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
