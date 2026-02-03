"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios"; // सेंट्रल API इंस्टेंस का उपयोग
import PatientOverlay from "./PatientOverlay";
import { Loader2, Calendar, User, Search, Clock } from "lucide-react";

export default function HospitalAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Overlay States
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeApptId, setActiveApptId] = useState(null);

  // रीयल-टाइम अपॉइंटमेंट्स फेच करना
  const fetchAppointments = useCallback(async () => {
    try {
      const { data } = await api.get("/api/hospital/appointments");
      setAppointments(data);
    } catch (error) {
      console.error("Transmission Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // ओवरले एरर को फिक्स करने के लिए मॉडिफाइड फंक्शन
  const handleViewPatient = async (patient, apptId) => {
    try {
      // पक्का करें कि हम केवल ID भेज रहे हैं, पूरा ऑब्जेक्ट नहीं
      const patientId = typeof patient === "object" ? patient._id : patient;

      const { data } = await api.get(`/api/hospital/patient/${patientId}`);
      setSelectedPatient(data);
      setActiveApptId(apptId);
    } catch (err) {
      alert("Search Error: Could not resolve patient metadata.");
    }
  };

  const handleStatusChange = async (apptId, status) => {
    try {
      await api.put(`/api/hospital/appointment/${apptId}`, { status });

      // लोकल स्टेट को तुरंत अपडेट करें
      setAppointments((prev) =>
        prev.map((a) => (a._id === apptId ? { ...a, status } : a)),
      );
      setSelectedPatient(null);
    } catch (err) {
      alert("Action failed: Node sync error.");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2
          className="w-8 h-8 animate-spin text-slate-300"
          strokeWidth={1}
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
          Syncing Registry...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Page Header */}
      <header className="border-b-[1.5px] border-black dark:border-slate-800 pb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">
          <Calendar size={14} /> Node Registry
        </div>
        <h1 className="text-5xl font-medium tracking-tighter italic text-black dark:text-white">
          Appointments
        </h1>
        <p className="text-slate-500 text-sm mt-2 italic">
          Management of confirmed and pending medical consultations.
        </p>
      </header>

      {/* Industrial Data Table */}
      <div className="border-[1.5px] border-black dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xl shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b-[1.5px] border-black dark:border-slate-800">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Identity
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Practitioner
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Timeline
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Status
                </th>
                <th className="p-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Configuration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-[1.5px] divide-black/5 dark:divide-slate-800">
              {appointments.map((app) => (
                <tr
                  key={app._id}
                  className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 border border-black/10 flex items-center justify-center text-[10px] font-black">
                        {app.patientName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold tracking-tight">
                          {app.patientName}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 tabular-nums">
                          {app.patientPhone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-medium">
                      Dr. {app.doctorId?.name || "Unassigned"}
                    </p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                      {app.doctorId?.specialization}
                    </p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      <Clock size={12} />{" "}
                      {new Date(app.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-4 py-1.5 border-[1.5px] text-[9px] font-black uppercase tracking-widest ${
                        app.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : app.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-rose-50 text-rose-600 border-rose-100"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <button
                      onClick={() => handleViewPatient(app.patientId, app._id)}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black uppercase tracking-widest hover:opacity-80 transition-all"
                    >
                      <Search size={12} /> View Node
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <div className="p-20 text-center space-y-4 opacity-30">
              <Calendar size={48} className="mx-auto" strokeWidth={1} />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                No registry records found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Patient Overlay Modal */}
      {selectedPatient && (
        <PatientOverlay
          patient={selectedPatient}
          appointmentId={activeApptId}
          onClose={() => setSelectedPatient(null)}
          onAction={handleStatusChange}
        />
      )}
    </div>
  );
}
