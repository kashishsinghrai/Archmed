"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"; // ✅ Production API instance
import { Lock, ShieldAlert, RefreshCw, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Using unified production endpoint
      const { data } = await api.post("/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      // Role Verification
      if (data.role !== "admin") {
        setError("Unauthorized Access: Admin privileges required.");
        setLoading(false);
        return;
      }

      // Secure session storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Redirect without history trail
      router.replace("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative antialiased transition-colors duration-300">
      {/* ✅ Back Button: Industrial Minimalist Design */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group outline-none"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
          strokeWidth={1.5}
        />
        Exit Portal
      </button>

      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-100 dark:border-slate-800 transition-all">
        {/* Portal Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-600/10 p-4 rounded-2xl text-blue-600 mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Admin Portal
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
            Archmed Network Infrastructure
          </p>
        </div>

        {/* Dynamic Error Alert */}
        {error && (
          <div className="flex items-center gap-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 p-4 rounded-2xl text-xs mb-6 border border-rose-100 dark:border-rose-900/30 font-bold animate-in fade-in zoom-in duration-300">
            <ShieldAlert size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Administrator Email
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@archmed.com"
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl dark:text-white focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all placeholder:text-slate-400 text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Access Key
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl dark:text-white focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all placeholder:text-slate-400 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-slate-900/10 dark:shadow-white/5 flex items-center justify-center gap-2 text-sm tracking-widest uppercase"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Authorizing...
              </>
            ) : (
              "Enter Infrastructure"
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
            Authorized Personnel Only <br />
            <span className="opacity-50 italic">
              IP logging is active for this session
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
