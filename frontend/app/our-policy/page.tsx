import type { Metadata } from "next";
import { ReactNode } from "react";

/* ================= META ================= */
export const metadata: Metadata = {
  title: "Our Policy | R.K. Mission School",
  description:
    "Read the policies of R.K. Mission School including academic, discipline, safety, and student welfare policies.",
  openGraph: {
    title: "Our Policy | R.K. Mission School",
    description:
      "School policies including discipline, safety, academics, and student welfare.",
    url: "https://rkmissionnwd.com/our-policy",
    siteName: "R.K. Mission School",
    type: "website",
  },
};

/* ================= TYPES ================= */
type PolicyType = {
  title: string;
  content: ReactNode;
};

/* ================= DATA ================= */
const policyData: PolicyType[] = [
  {
    title: "1. Academic Policy",
    content:
      "The school follows CBSE curriculum with NCERT pattern. Regular unit tests, exams, and performance tracking ensure academic excellence.",
  },
  {
    title: "2. Discipline Policy",
    content:
      "Students must maintain discipline, respect teachers, and follow school rules. Any misconduct may result in strict action.",
  },
  {
    title: "3. Attendance Policy",
    content:
      "Students must maintain regular attendance. Minimum attendance is required to appear in examinations.",
  },
  {
    title: "4. Safety & Security Policy",
    content:
      "The school campus is monitored through CCTV cameras to ensure student safety and a secure environment.",
  },
  {
    title: "5. Anti-Bullying Policy",
    content:
      "Bullying in any form is strictly prohibited. Strict action will be taken against any student involved in bullying.",
  },
  {
    title: "6. Fee Policy",
    content:
      "All fees must be paid on time. Late payments may attract penalties. Fees once paid are non-refundable.",
  },
  {
    title: "7. Uniform Policy",
    content:
      "Students must wear proper school uniform daily. Neatness and discipline in appearance are mandatory.",
  },
  {
    title: "8. Examination Policy",
    content:
      "Students will be evaluated through monthly tests, term exams, and final examinations.",
  },
  {
    title: "9. Use of School Property",
    content:
      "Students must take care of school property. Any damage caused will be chargeable.",
  },
  {
    title: "10. Transport Policy",
    content:
      "Students using school transport must follow all rules. The school is not responsible for delays due to external factors.",
  },
  {
    title: "11. Hostel Policy",
    content:
      "Students staying in hostel must follow strict discipline and hostel guidelines.",
  },
  {
    title: "12. Digital & Online Policy",
    content:
      "Students must use digital platforms responsibly. Misuse of online resources is strictly prohibited.",
  },
  {
    title: "13. Parent Responsibility",
    content:
      "Parents must ensure regular attendance, monitor student progress, and cooperate with school authorities.",
  },
];

/* ================= PAGE ================= */
export default function PolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12">
        
         <div className="relative mb-14">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl opacity-95"></div>
          
          
            <div className="relative z-10 text-center px-6 py-12 md:py-16 text-white">
          
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Our Policies
              </h1>
          
              <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
                 Our policies ensure a safe, disciplined, and high-quality learning environment.
              </p>
            </div>
         </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {policyData.map((policy, index) => (
            <PolicySection key={index} title={policy.title}>
              {policy.content}
            </PolicySection>
          ))}
        </div>

      </div>
    </main>
  );
}

/* ================= COMPONENT ================= */
type PolicySectionProps = {
  title: string;
  children: ReactNode;
};

function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <section className="border-b pb-6 last:border-none">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-gray-600 leading-relaxed">
        {children}
      </p>
    </section>
  );
}