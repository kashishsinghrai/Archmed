"use client";
import {
  X,
  Phone,
  MapPin,
  Fingerprint,
  Droplets,
  ShieldCheck,
  User,
} from "lucide-react";

export default function PatientOverlay({
  patient,
  appointmentId,
  onClose,
  onAction,
}) {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-950 w-full max-w-xl border-[1.5px] border-black dark:border-slate-800 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header: Industrial Branding */}
        <div className="p-8 border-b-[1.5px] border-black dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[9px] font-black text-blue-600 uppercase tracking-[0.3em]">
              <Fingerprint size={14} /> Identity Verification
            </div>
            <h2 className="text-xl font-bold tracking-tighter uppercase italic dark:text-white">
              Patient Metadata
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 border-[1.5px] border-black dark:border-slate-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 space-y-10">
          {/* Top Section: Avatar & Basic Info */}
          <div className="flex items-start gap-6">
            <div className="h-20 w-20 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-3xl font-black italic border-[1.5px] border-black">
              {patient.name?.charAt(0)}
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-medium tracking-tighter dark:text-white leading-none">
                {patient.name}
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                {patient.email}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
                <ShieldCheck size={12} /> Verified Network Member
              </div>
            </div>
          </div>

          {/* Metadata Grid: Sharp Industrial Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[1.5px] border-black dark:border-slate-800 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-black dark:divide-slate-800">
            {/* Blood Group: Critical Info Highlight */}
            <div className="p-6 bg-rose-50/30 dark:bg-rose-950/10 flex flex-col justify-between min-h-[100px]">
              <p className="text-[9px] font-black text-rose-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Droplets size={12} /> Blood Group
              </p>
              <p className="text-3xl font-black tracking-widest text-rose-600">
                {patient.bloodGroup || "N/A"}
              </p>
            </div>

            {/* Age/Gender */}
            <div className="p-6 flex flex-col justify-between min-h-[100px]">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <User size={12} /> Vital Stats
              </p>
              <p className="text-xl font-bold italic">
                {patient.age}Y / {patient.gender}
              </p>
            </div>

            {/* Contact */}
            <div className="p-6 flex flex-col justify-between min-h-[100px]">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Phone size={12} /> Phone Node
              </p>
              <p className="text-lg font-bold tabular-nums tracking-tighter">
                {patient.phone}
              </p>
            </div>

            {/* Address */}
            <div className="p-6 flex flex-col justify-between min-h-[100px]">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <MapPin size={12} /> Logistics
              </p>
              <p className="text-[11px] font-bold leading-tight uppercase">
                {patient.address}
              </p>
            </div>
          </div>
        </div>

        {/* Decision Actions: High Contrast */}
        <div className="p-6 border-t-[1.5px] border-black dark:border-slate-800 flex gap-0">
          <button
            onClick={() => onAction(appointmentId, "Confirmed")}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-all border-r-[1.5px] border-black"
          >
            Authorize
          </button>
          <button
            onClick={() => onAction(appointmentId, "Rejected")}
            className="flex-1 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-rose-600 hover:text-white transition-all"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
