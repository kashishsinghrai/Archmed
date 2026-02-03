"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Navbar from "@/components/Navbar";
import {
  Clock,
  Calendar,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // आपके 'getMyAppointments' कंट्रोलर का उपयोग
        const { data } = await api.get("/api/patient/my-appointments");
        setAppointments(data);
      } catch (err) {
        console.error("Infrastructure Sync Failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Rejected":
      case "Cancelled":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 antialiased">
      <Navbar />

      <div className="max-w-6xl mx-auto py-16 px-6 space-y-12">
        {/* Page Header */}
        <header className="border-b-[1.5px] border-black dark:border-slate-800 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">
              <Activity size={14} /> Health Registry
            </div>
            <h1 className="text-5xl font-medium tracking-tighter italic">
              Appointment History
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">
              Tracking verified medical node connections
            </p>
          </div>
          <div className="bg-slate-900 dark:bg-slate-800 p-4 border-[1.5px] border-black text-white hidden md:block">
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-50">
              Active Nodes
            </p>
            <p className="text-2xl font-light tracking-tighter">
              {appointments.length} Total
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2
              className="animate-spin text-black dark:text-white"
              size={24}
              strokeWidth={1.5}
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
              Fetching Metadata...
            </p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-32 border-[1.5px] border-dashed border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
            <Calendar
              className="mx-auto text-slate-200"
              size={48}
              strokeWidth={1}
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              No synchronized records found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-0 border-[1.5px] border-black dark:border-slate-800 divide-y-[1.5px] divide-black dark:divide-slate-800">
            {appointments.map((app) => (
              <div
                key={app._id}
                className="group p-8 flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={12} /> {app.hospitalId?.name}
                    </p>
                    <h3 className="text-2xl font-medium tracking-tight dark:text-white">
                      Dr. {app.doctorId?.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {app.doctorId?.specialization} • {app.hospitalId?.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} strokeWidth={2} />
                      {new Date(app.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} strokeWidth={2} />
                      {new Date(app.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="mt-8 md:mt-0 flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right hidden sm:block">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Consultation Fee
                    </p>
                    <p className="text-lg font-medium">
                      ₹{app.doctorId?.fees || "0"}
                    </p>
                  </div>
                  <span
                    className={`px-6 py-2 border-[1.5px] text-[10px] font-black uppercase tracking-widest ${getStatusStyle(app.status)}`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Industrial Footer Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center opacity-30">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">
          End of Encrypted Record Node
        </p>
      </div>
    </div>
  );
}
