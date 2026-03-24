"use client";

import { useState } from "react";

type FormData = {
  studentName: string;
  dob: string;
  class: string;
  gender: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  address: string;
};

export default function AdmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    dob: "",
    class: "",
    gender: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Handle Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validate = () => {
    let newErrors: Partial<FormData> = {};

    if (!formData.studentName) newErrors.studentName = "Student name required";
    if (!formData.dob) newErrors.dob = "Date of birth required";
    if (!formData.class) newErrors.class = "Class required";
    if (!formData.phone) newErrors.phone = "Phone required";
    if (!formData.email) newErrors.email = "Email required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      // Replace with your backend API
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("✅ Admission form submitted successfully!");
        setFormData({
          studentName: "",
          dob: "",
          class: "",
          gender: "",
          fatherName: "",
          motherName: "",
          phone: "",
          email: "",
          address: "",
        });
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-6 md:p-10 space-y-6"
    >
      {/* Student Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input name="studentName" label="Student Name" value={formData.studentName} onChange={handleChange} error={errors.studentName} />
        <Input name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} error={errors.dob} />

        <Select name="class" label="Select Class" value={formData.class} onChange={handleChange} error={errors.class}>
          <option value="">Select Class</option>
          <option>Nursery</option>
          <option>LKG</option>
          <option>UKG</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </Select>

        <Select name="gender" label="Gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </Select>
      </div>

      {/* Parent Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input name="fatherName" label="Father Name" value={formData.fatherName} onChange={handleChange} />
        <Input name="motherName" label="Mother Name" value={formData.motherName} onChange={handleChange} />
      </div>

      {/* Contact */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input name="phone" label="Phone Number" value={formData.phone} onChange={handleChange} error={errors.phone} />
        <Input name="email" label="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      </div>

      {/* Address */}
      <Textarea name="address" label="Address" value={formData.address} onChange={handleChange} />

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Submitting..." : "Submit Admission"}
        </button>
      </div>

      {/* Success */}
      {success && (
        <p className="text-green-600 text-center font-medium">
          {success}
        </p>
      )}
    </form>
  );
}


/* Reusable Input */
function Input({ label, error, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

/* Select */
function Select({ label, children, error, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select
        {...props}
        className="w-full border rounded-lg px-3 py-2"
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

/* Textarea */
function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full border rounded-lg px-3 py-2"
      />
    </div>
  );
}