"use client";
import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../../../components/Navbar";

export default function BookAppointment() {
  const { id: doctorId } = useParams(); // Get doctor ID from URL
  const searchParams = useSearchParams();
  const hospitalId = searchParams.get("hospitalId");
  const docName = searchParams.get("docName");

  const router = useRouter();

  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    date: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await axios.post("http://localhost:5000/api/patient/book", {
        doctorId,
        hospitalId,
        ...form,
      });
      setStatus("success");
      setTimeout(() => router.push("/patient"), 3000); // Redirect after 3s
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Booking Requested!
          </h2>
          <p className="text-gray-600 mt-2">
            The hospital will confirm your slot via SMS.
          </p>
          <p className="text-sm text-gray-400 mt-4">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-1">Book Appointment</h2>
        <p className="text-sm text-gray-500 mb-6">with Dr. {docName}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              required
              className="w-full p-2 border rounded dark:bg-gray-800"
              value={form.patientName}
              onChange={(e) =>
                setForm({ ...form, patientName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              required
              type="tel"
              className="w-full p-2 border rounded dark:bg-gray-800"
              value={form.patientPhone}
              onChange={(e) =>
                setForm({ ...form, patientPhone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Date
            </label>
            <input
              required
              type="date"
              className="w-full p-2 border rounded dark:bg-gray-800"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 mt-4"
          >
            {status === "loading" ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
