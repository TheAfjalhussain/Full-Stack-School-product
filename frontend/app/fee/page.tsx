import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fee Structure | R.K. Mission School",
  description:
    "Check the complete fee structure of R.K. Mission School from Nursery to Class 10.",
};

type Fee = {
  className: string;
  monthly: number;
};

const feeData: Fee[] = [
  { className: "Nursery", monthly: 1100 },
  { className: "LKG", monthly: 1200 },
  { className: "UKG", monthly: 1200 },
  { className: "Class 1", monthly: 1300 },
  { className: "Class 2", monthly: 1400 },
  { className: "Class 3", monthly: 1500 },
  { className: "Class 4", monthly: 1600 },
  { className: "Class 5", monthly: 1700 },
  { className: "Class 6", monthly: 1800 },
  { className: "Class 7", monthly: 1900 },
  { className: "Class 8", monthly: 2000 },
  { className: "Class 9", monthly: 2200 },
  { className: "Class 10", monthly: 2400 },
];


const extraFees = [
  { title: "Registration Fee", amount: "₹500 (one-time)" },
  { title: "Admission Fee", amount: "₹4,500 – ₹5,500" },
  { title: "Annual Fee", amount: "₹2,000 – ₹3,000" },
  { title: "Exam Fee", amount: "₹1,000 – ₹2,000" },
  { title: "Computer Lab Fee", amount: "₹600 – ₹1,200" },
];


export default function FeeStructurePage() {
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Premium Header Section */}
        <div className="relative mb-14">

  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl opacity-95"></div>

  {/* Content */}
  <div className="relative z-10 text-center px-6 py-12 md:py-16 text-white">

    {/* Badge */}
    <span className="inline-block mb-4 px-4 py-1 text-sm font-medium bg-white/20 backdrop-blur rounded-full">
      CBSE Curriculum • Nursery to Class 10
    </span>

    {/* Heading */}
    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
      Fee Structure
    </h1>

    {/* Subtitle */}
    <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
      Transparent, affordable, and well-structured fee system designed to provide
      quality education for every student.
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

        {/* Fee Table */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mb-10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4">Class</th>
                <th className="p-4">Monthly Fee</th>
                <th className="p-4">Yearly Fee</th>
              </tr>
            </thead>

            <tbody>
              {feeData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{item.className}</td>
                  <td className="p-4">₹{item.monthly}</td>
                  <td className="p-4">
                    ₹{item.monthly * 12}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Extra Fees */}
        <div className="bg-white shadow-xl rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">
            Additional Fees
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {extraFees.map((fee, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-4 rounded-lg hover:shadow-md transition"
              >
                <span className="font-medium">{fee.title}</span>
                <span className="text-blue-900 font-semibold">
                  {fee.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            Note: Fees are subject to change as per school management rules.
            Please contact the school office for the latest updates.
          </p>
        </div>

      </div>
    </main>
  );
}