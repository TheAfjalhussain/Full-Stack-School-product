import AdmissionForm from "@/components/Admission-form";

export const metadata = {
  title: "Admission Form | R.K. Mission School",
  description: "Apply for admission at R.K. Mission School",
};

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Premium Header Section */}
        <div className="relative mb-14">

          {/* /* Background  */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl opacity-95"></div>

          {/* /* Content  */}
          <div className="relative z-10 text-center px-6 py-12 md:py-16 text-white">

           {/* Badge */}
           <span className="inline-block mb-4 px-4 py-1 text-sm font-medium bg-white/20 backdrop-blur rounded-full">
             CBSE Curriculum • Nursery to Class 10
           </span>

           {/* Heading */}
           <h1 className="text-3xl md:text-5xl font-bold leading-tight">
             Admission Form 
           </h1>

           {/* Subtitle */}
           <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
             R.K Mission Public School  provide a quality education for every student.
           </p>

           {/* CTA Buttons */}
           <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">

      <a
        href="/admission"
        className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
      >
        Apply for Admission
      </a>

    </div>
  </div>
        </div>

        {/* Form */}
        <AdmissionForm />
      </div>
    </div>
  );
}