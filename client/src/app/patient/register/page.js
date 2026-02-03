"use client";

import { useState } from "react";
import api from "@/lib/axios"; // ✅ Production-ready API instance
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UserPlus, ShieldCheck } from "lucide-react";

export default function PatientRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "Male",
    address: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Centralized API Call
      await api.post("/api/auth/patient/register", form);
      alert("Registration Successful! Please Login.");
      router.push("/patient/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 relative antialiased">
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

      <div className="max-w-xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-3">
          <div className="flex justify-center mb-4 text-slate-900 dark:text-white">
            <UserPlus size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-light text-slate-900 dark:text-white tracking-tight">
            Join Archmed
          </h2>
          <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">
            Create your account to access quality healthcare in your region.
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                placeholder="Ex. Rahul Singh"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Email & Password (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <input
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                  type="email"
                  placeholder="name@mail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Security Key
                </label>
                <input
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Age & Gender (Grid) */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Age
                </label>
                <input
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white outline-none transition-all text-sm"
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Gender
                </label>
                <select
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white outline-none transition-all text-sm appearance-none cursor-pointer"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <input
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Residential Address
              </label>
              <textarea
                rows="2"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm resize-none"
                placeholder="Street, Village, District"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98] transition-all disabled:opacity-50 text-sm tracking-widest uppercase mt-4 flex items-center justify-center gap-2"
            >
              {loading ? "Registering..." : "Initialize Account"}
              {!loading && <ShieldCheck size={18} />}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Part of the secure Archmed infrastructure. <br />
          Already registered?{" "}
          <Link
            href="/patient/login"
            className="text-slate-900 dark:text-white hover:underline ml-1"
          >
            Access Portal
          </Link>
        </p>
      </div>
    </div>
  );
}
