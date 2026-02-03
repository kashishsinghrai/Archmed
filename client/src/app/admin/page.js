"use client";
import { useEffect, useState, useMemo } from "react";
import api from "@/lib/axios"; // ✅ Centralized API Instance
import Link from "next/link";
import {
  Activity,
  Clock,
  CheckCircle,
  ArrowRight,
  Loader2,
  Search,
  Users,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionId, setActionId] = useState(null); // Button loading state

  const fetchData = async () => {
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        api.get("/api/admin/pending"),
        api.get("/api/admin/approved"),
      ]);
      setPending(pendingRes.data);
      setApproved(approvedRes.data);
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered Pending List for Search
  const filteredPending = useMemo(() => {
    return pending.filter(
      (h) =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [pending, searchQuery]);

  const handleQuickAction = async (id, status) => {
    setActionId(id);
    try {
      await api.put("/api/admin/verify", { id, status });
      if (status === "Approved") {
        const item = pending.find((h) => h._id === id);
        setPending(pending.filter((h) => h._id !== id));
        setApproved([...approved, { ...item, isApproved: "Approved" }]);
      } else {
        setPending(pending.filter((h) => h._id !== id));
      }
    } catch (error) {
      alert("Verification update failed.");
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <RefreshCw
          className="w-8 h-8 animate-spin text-slate-900 dark:text-white"
          strokeWidth={1}
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
          Archiving Nodes...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Header with Last Sync */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-[1.5px] border-black pb-8 dark:border-slate-800">
        <div className="space-y-1">
          <h1 className="text-4xl font-light tracking-tighter text-slate-900 dark:text-white">
            Infrastructure Overview
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Node Sync: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchData}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <RefreshCw size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-[1.5px] border-black dark:border-slate-800 divide-x-[1.5px] divide-black dark:divide-slate-800">
        <div className="p-8 space-y-4 bg-white dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Active Facilities
          </p>
          <p className="text-6xl font-light tracking-tighter">
            {approved.length}
          </p>
        </div>
        <div className="p-8 space-y-4 bg-white dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
            In Review
          </p>
          <p className="text-6xl font-light tracking-tighter text-amber-500">
            {pending.length}
          </p>
        </div>
        <div className="p-8 space-y-4 bg-white dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Total Requests
          </p>
          <p className="text-6xl font-light tracking-tighter">
            {pending.length + approved.length}
          </p>
        </div>
        <div className="p-8 space-y-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
              Core Engine
            </p>
          </div>
          <p className="text-2xl font-light">Operational</p>
          <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">
            All nodes active
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Searchable Requests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-medium tracking-tight">
              Queue Management
            </h2>
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Search facility or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-[1.5px] border-black dark:border-slate-700 text-xs focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          <div className="border-[1.5px] border-black dark:border-slate-800 divide-y-[1.5px] divide-black dark:divide-slate-800">
            {filteredPending.length === 0 ? (
              <div className="p-20 text-center bg-slate-50 dark:bg-slate-900/50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  No matching requests
                </p>
              </div>
            ) : (
              filteredPending.slice(0, 5).map((hospital) => (
                <div
                  key={hospital._id}
                  className="p-8 group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium tracking-tight group-hover:underline underline-offset-4">
                      {hospital.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-2 tracking-wide">
                      <Users size={12} /> {hospital.address}
                    </p>
                    <div className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold tracking-tighter">
                      LICENSE: {hospital.licenseNumber}
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button
                      disabled={actionId === hospital._id}
                      onClick={() =>
                        handleQuickAction(hospital._id, "Approved")
                      }
                      className="flex-1 md:flex-none px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest border border-black hover:bg-slate-800 dark:hover:bg-slate-100 transition-all disabled:opacity-50"
                    >
                      {actionId === hospital._id ? "Processing" : "Approve"}
                    </button>
                    <button
                      disabled={actionId === hospital._id}
                      onClick={() =>
                        handleQuickAction(hospital._id, "Rejected")
                      }
                      className="flex-1 md:flex-none px-6 py-2.5 bg-white dark:bg-slate-900 text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-800 hover:text-black hover:border-black transition-all disabled:opacity-50"
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Insights & Guidelines */}
        <div className="space-y-8">
          <div className="p-8 border-[1.5px] border-black dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Security Protocols
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <ShieldCheck
                  size={18}
                  className="text-black dark:text-white shrink-0"
                  strokeWidth={1.5}
                />
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-medium group-hover:text-black transition-colors">
                  Cross-verify license numbers with the Medical Council database
                  before authorization.
                </p>
              </li>
              <li className="flex gap-4 group">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 shrink-0"
                  strokeWidth={1.5}
                />
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-medium group-hover:text-black transition-colors">
                  Rejected applications are purged from the primary node after 7
                  days.
                </p>
              </li>
              <li className="flex gap-4 group">
                <RefreshCw
                  size={18}
                  className="text-black dark:text-white shrink-0"
                  strokeWidth={1.5}
                />
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-medium group-hover:text-black transition-colors">
                  Database mirrors and backups are generated every 24 hours at
                  00:00 UTC.
                </p>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
              Network Load
            </p>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1">
              <div className="w-[45%] bg-black dark:bg-white h-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 italic">
              Optimized traffic: 1.2s avg latency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
