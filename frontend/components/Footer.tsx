'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';

import { useApi } from '@/hooks/use-api';
import { api } from '@/lib/api';
import logo from '@/public/images/rkms-logo1.png';

export default function Footer() {
  const { data: schoolInfo } = useApi(() => api.getSchoolInfo(), []);

  const schoolName = schoolInfo?.name || 'R.K. Mission School';
  const schoolDescription =
    schoolInfo?.description ||
    schoolInfo?.tagline ||
    "Excellence in education since 1985. Nurturing minds, building futures.";

  const schoolAddress =
    schoolInfo?.address || 'Bihar, India';
  const schoolPhone =
    schoolInfo?.phone || '+91 XXXXX XXXXX';
  const schoolEmail =
    schoolInfo?.email || 'info@school.com';

  return (
    <footer className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* SCHOOL INFO */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src={logo}
                alt="School Logo"
                priority
                className="h-24 w-auto object-center transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-semibold tracking-wide">
                {schoolName}
              </span>
            </Link>

            <p className="text-gray-300 leading-relaxed text-sm">
              {schoolDescription}
            </p>
          </div>

          {/* PAGES */}
          <div>
            <h3 className="text-lg font-semibold mb-5 border-l-4 border-amber-500 pl-3">
              Pages
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                { name: 'About Us', link: '/about' },
                { name: 'Gallery', link: '/gallery' },
                { name: 'Students', link: '/students' },
                { name: 'Academic Agenda', link: '/agenda' },
                { name: 'Achievements', link: '/achievements' },
                { name: 'Events', link: '/events' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-gray-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-5 border-l-4 border-amber-500 pl-3">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                { name: 'Admission Form', link: '/admission' },
                { name: 'Fee Structure', link: '/fee' },
                { name: 'Our Policy', link: '/our-policy' },
                { name: 'Terms & Conditions', link: '/term-condition' },
                { name: 'Contact', link: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-gray-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-5 border-l-4 border-amber-500 pl-3">
              Contact
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-amber-500 mt-1" size={18} />
                <span className="text-gray-300">{schoolAddress}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-amber-500" size={18} />
                <span className="text-gray-300">{schoolPhone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-amber-500" size={18} />
                <span className="text-gray-300">{schoolEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {schoolName}. All rights reserved.
          </p>

          <Link
            href="https://growthix.in"
            target="_blank"
            className="text-gray-400 font-medium hover:text-amber-400 text-sm transition"
          >
            Developed & Designed by: Growthix & Apdigi
          </Link>

          {/* SOCIAL */}
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <Icon
                key={i}
                size={18}
                className="text-gray-400 hover:text-amber-400 cursor-pointer transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}