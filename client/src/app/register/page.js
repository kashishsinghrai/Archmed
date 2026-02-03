"use client";

import { useState } from "react";
import api from "@/lib/axios"; // ✅ Production API instance
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Building2, Globe } from "lucide-react";

export default function RegisterHospital() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    licenseNumber: "",
    specialties: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const specialtiesArray = form.specialties
        ? form.specialties
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : [];

      const dataToSend = {
        ...form,
        specialties: specialtiesArray,
      };

      // ✅ Centralized API call
      await api.post("/api/auth/register", dataToSend);

      alert(
        "Application Submitted! Our Admin team will review your license and approve your facility soon.",
      );
      router.push("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Check your network.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-16 relative antialiased">
      {/* ✅ Back Button: Industrial Minimalist */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
          strokeWidth={1.5}
        />
        Back to Home
      </button>

      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex justify-center text-slate-900 dark:text-white">
            <Building2 size={40} strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-light text-slate-900 dark:text-white tracking-tight">
            Facility Onboarding
          </h1>
          <p className="text-sm text-slate-500 font-medium tracking-wide">
            Register your medical center for SSIP Archmed integration.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm transition-all">
          <form onSubmit={handleRegister} className="space-y-8">
            {/* Hospital Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Facility Name
              </label>
              <input
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                placeholder="Ex. City General Hospital"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
                required
              />
            </div>

            {/* Email & Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Official Email
                </label>
                <input
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                  type="email"
                  placeholder="admin@hospital.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  value={form.email}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Security Key
                </label>
                <input
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  value={form.password}
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Full Logistics Address
              </label>
              <input
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                placeholder="Street, City, State, PIN"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                value={form.address}
                required
              />
            </div>

            {/* License Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Medical License Number (MCI)
              </label>
              <input
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                placeholder="REGISTRATION-ID-XXXX"
                onChange={(e) =>
                  setForm({ ...form, licenseNumber: e.target.value })
                }
                value={form.licenseNumber}
                required
              />
            </div>

            {/* Specialties */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Specialties (Comma Separated)
              </label>
              <input
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                placeholder="Cardiology, Neurology, Dental"
                onChange={(e) =>
                  setForm({ ...form, specialties: e.target.value })
                }
                value={form.specialties}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Processing Metadata..." : "Submit Registration Node"}
              {!loading && <ShieldCheck size={18} />}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Application Status: Pending Deployment <br />
            Already a partner?{" "}
            <a
              href="/login"
              className="text-slate-900 dark:text-white hover:underline ml-1"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
