"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"; // ✅ सेंट्रल API इंस्टेंस का उपयोग करें
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ अनहाइड स्टेट
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ एंडपॉइंट अब डायनामिक होगा (localhost की जगह live URL)
      const { data } = await api.post("/api/auth/login", { email, password });

      localStorage.setItem("userInfo", JSON.stringify(data));

      if (data.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/hospital");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 relative">
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

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-medium tracking-tighter italic">
            Archmed Pro
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
            Node Authentication
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-[10px] font-black uppercase text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Network ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="node@archmed.com"
                className="w-full p-4 border-[1.5px] border-black dark:border-slate-800 bg-transparent text-sm outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Security Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // ✅ अनहाइड लॉजिक
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-4 border-[1.5px] border-black dark:border-slate-800 bg-transparent text-sm outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              {loading ? "Authenticating Node..." : "Initiate Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
