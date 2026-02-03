"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Fingerprint,
  ShieldCheck,
  Loader2,
  Droplets,
} from "lucide-react";

export default function PatientProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    bloodGroup: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // आपके 'getProfile' कंट्रोलर का उपयोग
        const { data } = await api.get("/api/patient/profile");
        setForm(data);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // आपके 'updateProfile' कंट्रोलर का उपयोग
      const { data } = await api.put("/api/patient/profile", form);

      // Local storage अपडेट करें ताकि Navbar में नाम बदल जाए
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...userInfo, name: data.name }),
      );

      setMessage({
        type: "success",
        text: "Registry Synchronized: Profile updated successfully!",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message || "Transmission Error: Update failed",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2
          className="animate-spin text-slate-300"
          size={32}
          strokeWidth={1}
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
          Loading Patient Node...
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <header className="border-b-[1.5px] border-black dark:border-slate-800 pb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">
          <Fingerprint size={14} /> Identity Node: {form._id?.slice(-6)}
        </div>
        <h1 className="text-5xl font-medium tracking-tighter italic text-black dark:text-white">
          Health Profile
        </h1>
        <p className="text-slate-500 text-sm mt-2 italic">
          Manage your medical identity and contact infrastructure.
        </p>
      </header>

      {message.text && (
        <div
          className={`p-4 border-[1.5px] text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-top-4 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-rose-50 border-rose-200 text-rose-700"
          }`}
        >
          <ShieldCheck size={18} /> {message.text}
        </div>
      )}

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {/* Left Column: Personal Metadata */}
        <div className="md:col-span-2 space-y-10">
          <section className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Personal Metadata
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Full Legal Name
                </label>
                <input
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 text-sm outline-none focus:bg-white transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Age
                  </label>
                  <input
                    type="number"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 text-sm outline-none focus:bg-white transition-all"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Gender
                  </label>
                  <select
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 text-sm outline-none focus:bg-white transition-all"
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Communication & Residence
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Phone Node
                  </label>
                  <input
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 text-sm outline-none focus:bg-white transition-all"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 opacity-50">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Email (Immutable)
                  </label>
                  <div className="w-full p-4 bg-slate-100 dark:bg-slate-800 border-[1.5px] border-slate-200 dark:border-slate-700 text-sm flex items-center gap-2 cursor-not-allowed">
                    <Mail size={14} /> {form.email}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Home Logistics Address
                </label>
                <textarea
                  rows="3"
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-[1.5px] border-black dark:border-slate-800 text-sm outline-none focus:bg-white transition-all resize-none"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Medical Quick-View */}
        <div className="space-y-10">
          <section className="space-y-6 bg-slate-900 dark:bg-white p-8 border-[1.5px] border-black dark:border-white shadow-xl shadow-blue-500/10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              Medical Vital
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Droplets size={12} className="text-rose-500" /> Blood Group
                </label>
                <select
                  className="w-full p-4 bg-slate-800 dark:bg-slate-50 border-none text-white dark:text-black text-xl font-light tracking-widest outline-none focus:ring-1 focus:ring-blue-500"
                  value={form.bloodGroup}
                  onChange={(e) =>
                    setForm({ ...form, bloodGroup: e.target.value })
                  }
                >
                  <option value="">N/A</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="pt-4 border-t border-slate-700 dark:border-slate-200">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                  Important: This data is critical for emergency triage nodes.
                  Ensure accuracy.
                </p>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-6 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.4em] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-2xl active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            Synchronize Registry
          </button>
        </div>
      </form>
    </div>
  );
}
