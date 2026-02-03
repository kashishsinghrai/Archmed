"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios"; // सेंट्रल API इंस्टेंस का उपयोग
import {
  Trash2,
  Plus,
  X,
  Loader2,
  UserPlus,
  ShieldCheck,
  Award,
  IndianRupee,
  Briefcase,
} from "lucide-react";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    degree: "",
    experience: "",
    fees: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = useCallback(async () => {
    try {
      // आपके 'getDoctors' कंट्रोलर का उपयोग
      const { data } = await api.get("/api/hospital/doctors");
      setDoctors(data);
    } catch (error) {
      console.error("Infrastructure Sync Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // आपके 'addDoctor' कंट्रोलर का उपयोग
      await api.post("/api/hospital/add-doctor", formData);
      setShowForm(false);
      setFormData({
        name: "",
        specialization: "",
        degree: "",
        experience: "",
        fees: "",
      });
      fetchDoctors();
      alert("Practitioner Node Registered Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Registry Error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to decommission this doctor node?"))
      return;
    try {
      // आपके 'deleteDoctor' कंट्रोलर का उपयोग
      await api.delete(`/api/hospital/delete-doctor/${id}`);
      fetchDoctors();
    } catch (error) {
      alert("Decommissioning failed.");
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
          Loading Registry...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex justify-between items-end border-b-[1.5px] border-black dark:border-slate-800 pb-10 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">
            <Briefcase size={14} /> Human Resources
          </div>
          <h1 className="text-5xl font-medium tracking-tighter italic text-black dark:text-white">
            Practitioners
          </h1>
          <p className="text-slate-500 text-sm mt-2 italic">
            Management of verified medical staff nodes.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-[1.5px] border-black ${
            showForm
              ? "bg-white text-black"
              : "bg-black text-white dark:bg-white dark:text-black"
          }`}
        >
          {showForm ? (
            <X size={16} strokeWidth={2.5} />
          ) : (
            <Plus size={16} strokeWidth={2.5} />
          )}
          {showForm ? "Cancel" : "Add Practitioner"}
        </button>
      </header>

      {/* Industrial Form */}
      {showForm && (
        <div className="bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 p-10 animate-in slide-in-from-top-4 duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Full Name
                </label>
                <input
                  className="w-full p-4 bg-white dark:bg-slate-800 border-[1.5px] border-black text-sm outline-none focus:ring-1 focus:ring-black transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  value={formData.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Specialization
                </label>
                <input
                  className="w-full p-4 bg-white dark:bg-slate-800 border-[1.5px] border-black text-sm outline-none focus:ring-1 focus:ring-black transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                  value={formData.specialization}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Degree Metadata
                </label>
                <input
                  className="w-full p-4 bg-white dark:bg-slate-800 border-[1.5px] border-black text-sm outline-none focus:ring-1 focus:ring-black transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  value={formData.degree}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Years of Exp.
                  </label>
                  <input
                    type="number"
                    className="w-full p-4 bg-white dark:bg-slate-800 border-[1.5px] border-black text-sm outline-none focus:ring-1 focus:ring-black transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    value={formData.experience}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Consultation Fees
                  </label>
                  <input
                    type="number"
                    className="w-full p-4 bg-white dark:bg-slate-800 border-[1.5px] border-black text-sm outline-none focus:ring-1 focus:ring-black transition-all font-mono"
                    onChange={(e) =>
                      setFormData({ ...formData, fees: e.target.value })
                    }
                    value={formData.fees}
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-90 transition-all"
            >
              Commit Doctor Node to Registry
            </button>
          </form>
        </div>
      )}

      {/* Doctors Registry Grid */}
      <div className="grid gap-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-[1.5px] border-black dark:border-slate-800 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-black dark:divide-slate-800">
        {doctors.length === 0 ? (
          <div className="col-span-full p-32 text-center opacity-20">
            <UserPlus size={48} className="mx-auto mb-4" strokeWidth={1} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              No practitioners registered.
            </p>
          </div>
        ) : (
          doctors.map((doc) => (
            <div
              key={doc._id}
              className="group relative p-10 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <button
                onClick={() => handleDelete(doc._id)}
                className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-all"
              >
                <Trash2 size={18} strokeWidth={2} />
              </button>

              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-medium tracking-tighter italic leading-none">
                    {doc.name}
                  </h3>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-3">
                    {doc.specialization}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2">
                      <Award size={14} /> Qualification
                    </span>
                    <span className="text-black dark:text-white">
                      {doc.degree}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2">
                      <Briefcase size={14} /> Experience
                    </span>
                    <span className="text-black dark:text-white">
                      {doc.experience} Years
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2">
                      <IndianRupee size={14} /> Rate
                    </span>
                    <span className="text-black dark:text-white font-mono">
                      ₹{doc.fees}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t-[1.5px] border-black/5 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">
                    Active Node
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
