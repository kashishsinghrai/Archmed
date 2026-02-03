"use client";

import { useState } from "react";
import api from "@/lib/axios"; // ✅ Production-ready API instance का उपयोग
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // ✅ बैक आइकन इम्पोर्ट किया

export default function PatientLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Centralized API instance का उपयोग
      const res = await api.post("/api/auth/patient/login", form);

      // Save login data
      localStorage.setItem("userInfo", JSON.stringify(res.data));

      // Redirect
      router.replace("/patient");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative antialiased">
      {/* ✅ Back Button: Industrial Minimalist Design */}
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

      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-4xl font-light text-slate-900 dark:text-white tracking-tight">
            Patient Login
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Manage your rural healthcare appointments
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 p-4 rounded-xl text-xs mb-6 border border-red-200 dark:border-red-900 text-center font-bold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all text-sm"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98] transition-all disabled:opacity-50 text-sm tracking-wide"
            >
              {loading ? "Verifying Access..." : "Sign In to Portal"}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm">
          <p className="text-slate-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/patient/register"
              className="text-slate-900 dark:text-white font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
