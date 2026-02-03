"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building2,
  ArrowRight,
  Stethoscope,
  Activity,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function HospitalSearch() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ city: "", specialty: "" });

  const treatmentCategories = [
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dental",
    "Gynecology",
    "Dermatology",
  ];

  // API कॉल को रीयल-टाइम बनाने के लिए useCallback का उपयोग
  const fetchHospitals = useCallback(async () => {
    setLoading(true);
    try {
      // Query parameters को साफ़ करके भेजें
      const { data } = await api.get(
        `/api/patient/hospitals?city=${filters.city}&specialty=${filters.specialty}`,
      );
      setHospitals(data);
    } catch (err) {
      console.error("Transmission Error:", err);
    } finally {
      setLoading(false);
    }
  }, [filters.city, filters.specialty]);

  // पहली बार लोड होने पर और फ़िल्टर बदलने पर डेटा लाएं
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchHospitals();
    }, 500); // टाइपिंग के दौरान सर्वर पर लोड कम करने के लिए डिले

    return () => clearTimeout(delayDebounceFn);
  }, [fetchHospitals]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-700 bg-white dark:bg-slate-950">
      {/* Page Header */}
      <header className="border-b-[1.5px] border-black dark:border-slate-800 pb-12">
        <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4">
          <ShieldCheck size={14} /> Global Health Node Discovery
        </div>
        <h1 className="text-6xl font-medium tracking-tighter italic">
          Find Healthcare
        </h1>
        <p className="text-slate-500 text-sm mt-4 max-w-xl">
          Enter your location and select a medical specialty to synchronize with
          verified healthcare facilities.
        </p>
      </header>

      {/* Industrial Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-black dark:border-slate-800 shadow-2xl shadow-black/5">
        <div className="p-6 bg-white dark:bg-slate-900 flex items-center gap-4 border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black dark:border-slate-800">
          <MapPin size={20} className="text-slate-400" />
          <div className="flex-1">
            <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
              Target City
            </p>
            <input
              placeholder="e.g. Ahmedabad"
              className="w-full bg-transparent text-sm font-bold outline-none"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            />
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 flex items-center gap-4 border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-black dark:border-slate-800">
          <Stethoscope size={20} className="text-slate-400" />
          <div className="flex-1">
            <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
              Specialization
            </p>
            <select
              className="w-full bg-transparent text-sm font-bold outline-none appearance-none cursor-pointer"
              value={filters.specialty}
              onChange={(e) =>
                setFilters({ ...filters, specialty: e.target.value })
              }
            >
              <option value="">All Categories</option>
              {treatmentCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={fetchHospitals}
          className="bg-black dark:bg-white text-white dark:text-black py-8 text-[11px] font-black uppercase tracking-[0.4em] hover:opacity-90 transition-all flex items-center justify-center gap-3"
        >
          <Search size={18} /> Initiate Network Scan
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-[1.5px] border-black dark:border-slate-800 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-black dark:divide-slate-800">
        {loading ? (
          <div className="col-span-full py-40 text-center flex flex-col items-center gap-4">
            <Loader2
              className="animate-spin text-slate-300"
              size={32}
              strokeWidth={1}
            />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              Fetching Registry...
            </p>
          </div>
        ) : hospitals.length === 0 ? (
          <div className="col-span-full py-40 text-center opacity-30 italic font-medium tracking-widest text-sm">
            Zero matching healthcare nodes found in this sector.
          </div>
        ) : (
          hospitals.map((h) => (
            <div
              key={h._id}
              className="group p-10 space-y-10 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Building2 size={32} strokeWidth={1} />
                  <span className="px-3 py-1 border-[1.5px] border-emerald-100 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest">
                    Verified
                  </span>
                </div>
                <h3 className="text-3xl font-medium tracking-tighter italic leading-none">
                  {h.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin size={12} /> {h.city}
                  </p>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed uppercase tracking-tighter">
                    {h.address}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {h.specialties?.map((s, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-bold border-[1.5px] border-black/10 px-3 py-1.5 uppercase tracking-tighter bg-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/patient/hospital/${h._id}`}
                  className="flex items-center justify-between pt-8 border-t-[1.5px] border-black/5 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-blue-600 transition-all"
                >
                  Synchronize with Facility <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
