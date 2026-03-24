import type { Metadata } from "next";
import { ReactNode } from "react";

/* ================= META ================= */
export const metadata: Metadata = {
  title: "Terms & Conditions | R.K. Mission School",
  description:
    "Read the official terms and conditions of R.K. Mission School including admission policy, fee rules, and student conduct.",
  openGraph: {
    title: "Terms & Conditions | R.K. Mission School",
    description:
      "Official school policies including admission, fees, and discipline.",
    url: "https://rkmissionnwd.com/terms-and-conditions",
    siteName: "R.K. Mission School",
    type: "website",
  },
};

/* ================= TYPES ================= */
type SectionType = {
  title: string;
  content: ReactNode;
};

/* ================= DATA ================= */
const termsData: SectionType[] = [
  {
    title: "1. Introduction",
    content:
      "By accessing our website, you agree to comply with our terms and policies.",
  },
  {
    title: "2. Admission ",
    content:
      "Admission is subject to eligibility and seat availability. False information may lead to cancellation.",
  },
  {
    title: "3. Fee ",
    content:
      "All fees must be paid on time. Fees once paid are non-refundable.",
  },
  {
    title: "4. Student Conduct",
    content:
      "Students must maintain discipline, respect teachers, and follow school rules.",
  },
  {
    title: "5. Attendance ",
    content:
      "Minimum attendance is required. Leave must be informed in advance.",
  },
  {
    title: "6. Academic ",
    content:
      "Students are evaluated through monthly tests and examinations.",
  },
  {
    title: "7. Use of Facilities",
    content:
      "Any damage to school property will be chargeable to the student.",
  },
  {
    title: "8. Safety & Monitoring",
    content:
      "CCTV monitoring is used for student safety and security purposes.",
  },
  {
    title: "9. Transport & Hostel",
    content:
      "All transport and hostel rules must be strictly followed.",
  },
  {
    title: "10. Website Usage",
    content:
      "Unauthorized use or duplication of website content is prohibited.",
  },
  {
    title: "11. Privacy Policy",
    content:
      "Personal data is kept secure and used only for school administration.",
  },
  {
    title: "12. Changes to Terms",
    content:
      "The school reserves the right to update terms at any time.",
  },
  {
    title: "13. Contact Information",
    content: (
      <>
        Rajendra Nagar, Nawada <br />
        Email: rkmissionnwd@gmail.com
      </>
    ),
  },
];

/* ================= PAGE ================= */
export default function TermsPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12">

        <div className="relative mb-14">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl opacity-95"></div>
          
          
            <div className="relative z-10 text-center px-6 py-12 md:py-16 text-white">
          
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Terms & Conditions
              </h1>
          
              <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
                Please read these Terms & Conditions carefully before Taking Admission in our School.
              </p>
            </div>
         </div>

        {/* Sections */}
        <div className="space-y-8">
          {termsData.map((section, index) => (
            <Section key={index} title={section.title}>
              {section.content}
            </Section>
          ))}
        </div>

      </div>
    </main>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="border-b pb-6 last:border-none">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </section>
  );
}