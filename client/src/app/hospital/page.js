"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Users,
  Calendar,
  Activity,
  Loader2,
  Globe,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function HospitalHome() {
  const [hospitalData, setHospitalData] = useState({ name: "", city: "" });
  const [stats, setStats] = useState({ doctors: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. हॉस्पिटल की प्रोफाइल जानकारी प्राप्त करें
        const profileRes = await api.get("/api/hospital/profile");
        setHospitalData(profileRes.data);

        // 2. रीयल-टाइम आंकड़े प्राप्त करें
        const statsRes = await api.get("/api/hospital/stats");
        setStats(statsRes.data);
      } catch (error) {
        console.error("Infrastructure Sync Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2
          className="w-8 h-8 animate-spin text-slate-300"
          strokeWidth={1}
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
          Synchronizing Health Node...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="border-b-[1.5px] border-black dark:border-slate-800 pb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">
            <Globe size={14} /> Node Location:{" "}
            {hospitalData.city || "Registry Active"}
          </div>
          <h1 className="text-6xl font-medium tracking-tighter italic text-black dark:text-white leading-none">
            {hospitalData.name}
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
            Verified Healthcare Infrastructure Node
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest border-[1.5px] border-emerald-100 bg-emerald-50 px-4 py-2">
          <ShieldCheck size={14} /> System Secure
        </div>
      </header>

      {/* Stats Grid: Industrial Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-[1.5px] border-black dark:border-slate-800 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-black dark:divide-slate-800 shadow-2xl shadow-black/5">
        {/* Medical Staff Node */}
        <Link
          href="/hospital/doctors"
          className="group p-10 space-y-8 bg-white dark:bg-slate-900 hover:bg-slate-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Practitioner Registry
            </p>
            <ArrowUpRight
              size={18}
              className="text-slate-300 group-hover:text-black transition-all"
            />
          </div>
          <div className="space-y-1">
            <p className="text-6xl font-light tracking-tighter tabular-nums">
              {stats.doctors}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Active Doctors
            </p>
          </div>
        </Link>

        {/* Appointments Node */}
        <Link
          href="/hospital/appointments"
          className="group p-10 space-y-8 bg-white dark:bg-slate-900 hover:bg-slate-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Consultation Queue
            </p>
            <ArrowUpRight
              size={18}
              className="text-slate-300 group-hover:text-black transition-all"
            />
          </div>
          <div className="space-y-1">
            <p className="text-6xl font-light tracking-tighter tabular-nums">
              {stats.appointments}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Scheduled Visits
            </p>
          </div>
        </Link>

        {/* Operational Status */}
        <div className="p-10 space-y-8 bg-black dark:bg-white text-white dark:text-black">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">
              System Integrity
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                Online
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-medium tracking-tighter italic">
              All Systems Operational
            </h3>
            <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">
              Cloud Sync: 24ms Latency
            </p>
          </div>
        </div>
      </div>

      {/* Info Section / Footer Branding */}
      <footer className="pt-20 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 italic">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500 text-center">
          Archmed Infrastructure Management © 2026
        </p>
        <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest">
          <span>Security Level: 04</span>
          <span>Data Encryption: AES-256</span>
        </div>
      </footer>
    </div>
  );
}
