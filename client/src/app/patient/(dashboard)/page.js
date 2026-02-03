"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";
import {
  Search,
  Calendar,
  User,
  Clock,
  Activity,
  ChevronRight,
  ShieldCheck,
  Globe,
  Loader2,
} from "lucide-react";

export default function PatientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ upcoming: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("userInfo");

      if (!storedUser) {
        router.replace("/patient/login");
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== "patient") {
          router.replace("/patient/login");
          return;
        }
        setUser(parsedUser);

        // आपके 'getMyAppointments' कंट्रोलर का उपयोग
        const { data } = await api.get("/api/patient/my-appointments");

        const upcomingCount = data.filter(
          (app) => app.status === "Confirmed" || app.status === "Pending",
        ).length;

        setStats({
          upcoming: upcomingCount,
          total: data.length,
        });
      } catch (error) {
        console.error("Dashboard Metadata Sync Failed", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("userInfo");
          router.replace("/patient/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2
          className="animate-spin text-black dark:text-white"
          size={32}
          strokeWidth={1}
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
          Synchronizing Health Node...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-700 bg-white dark:bg-slate-950 min-h-screen antialiased">
      {/* Header Section: Industrial Style */}
      <header className="border-b-[1.5px] border-black dark:border-slate-800 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">
            <Globe size={14} /> Global Health Registry Active
          </div>
          <h1 className="text-5xl font-medium tracking-tighter text-black dark:text-white">
            Welcome, <span className="italic font-bold">{user?.name}</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md">
            Operational overview of your medical consultations and verified
            health data points.
          </p>
        </div>

        <Link href="/patient/search">
          <button className="flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl active:scale-95">
            <Search size={18} strokeWidth={2.5} />
            Search Node Network
          </button>
        </Link>
      </header>

      {/* Infrastructure Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-[1.5px] border-black dark:border-slate-800 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-black dark:divide-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xl shadow-black/5">
        {[
          {
            label: "Upcoming Syncs",
            value: stats.upcoming,
            icon: <Clock size={20} />,
            color: "text-blue-600",
          },
          {
            label: "Lifetime Logs",
            value: stats.total,
            icon: <Calendar size={20} />,
            color: "text-emerald-600",
          },
          {
            label: "Node Status",
            value: "Stable",
            icon: <Activity size={20} />,
            color: "text-rose-600",
          },
          {
            label: "Auth Status",
            value: "Verified",
            icon: <ShieldCheck size={20} />,
            color: "text-amber-600",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-10 space-y-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className={`${card.color} opacity-60`}>{card.icon}</div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {card.label}
              </p>
              <h3 className="text-3xl font-light tracking-tighter mt-1 dark:text-white">
                {card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Operational Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Link
          href="/patient/search"
          className="group relative p-12 bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-500 overflow-hidden"
        >
          <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
            <div className="flex justify-between items-center">
              <div className="p-4 bg-black dark:bg-white text-white dark:text-black group-hover:bg-white dark:group-hover:bg-black group-hover:text-black dark:group-hover:text-white transition-colors">
                <Search size={28} strokeWidth={1.5} />
              </div>
              <ChevronRight
                size={24}
                className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-medium tracking-tighter">
                Node Discovery
              </h3>
              <p className="text-sm opacity-60 font-medium leading-relaxed">
                Connect with specialists across the regional infrastructure.
                Real-time availability synchronization.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/patient/appointments"
          className="group relative p-12 bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-500 overflow-hidden"
        >
          <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
            <div className="flex justify-between items-center">
              <div className="p-4 bg-black dark:bg-white text-white dark:text-black group-hover:bg-white dark:group-hover:bg-black group-hover:text-black dark:group-hover:text-white transition-colors">
                <Calendar size={28} strokeWidth={1.5} />
              </div>
              <ChevronRight
                size={24}
                className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-medium tracking-tighter">
                Registry Logs
              </h3>
              <p className="text-sm opacity-60 font-medium leading-relaxed">
                Review your consultation history and upcoming health node
                appointments with verified doctors.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer Branding Overlay */}
      <footer className="pt-20 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center opacity-30 italic">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em]">
          Archmed Infrastructure Protocol 2026
        </p>
        <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest">
          <span>Security Level: 02</span>
          <span>Latency: 24ms</span>
        </div>
      </footer>
    </div>
  );
}
