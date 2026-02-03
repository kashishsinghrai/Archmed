"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Globe, Save, Loader2, ShieldCheck } from "lucide-react";

export default function FacilityProfile() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    licenseNumber: "",
    address: "",
    city: "",
    specialties: "",
    contactNumber: "",
    about: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // API कॉल का पाथ चेक करें
        const { data } = await api.get("/api/hospital/profile");

        setForm({
          name: data.name || "",
          email: data.email || "", // रजिस्ट्रेशन से
          licenseNumber: data.licenseNumber || "", // रजिस्ट्रेशन से
          address: data.address || "", // रजिस्ट्रेशन से
          city: data.city || "",
          specialties: data.specialties?.join(", ") || "",
          contactNumber: data.contactNumber || "",
          about: data.about || "",
        });
      } catch (err) {
        console.error("404 Error: Path mismatch or Server down");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const dataToSend = {
        ...form,
        specialties: form.specialties
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };
      // अपडेट के लिए सही एंडपॉइंट
      await api.put("/api/hospital/update-profile", dataToSend);
      alert("Infrastructure Node Synchronized Successfully.");
    } catch (err) {
      alert("Sync Error: Update failed.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-4xl space-y-12 p-8 animate-in fade-in duration-700">
      <header className="border-b-[1.5px] border-black pb-10">
        <h1 className="text-4xl font-light italic">Facility Profile</h1>
      </header>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Verified Data Section */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6 p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
          <div>
            <p className="text-[9px] font-black uppercase text-slate-400">
              Network ID
            </p>
            <p className="text-sm font-bold">{form.email}</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-400">
              License MCI
            </p>
            <p className="text-sm font-bold">{form.licenseNumber}</p>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Hospital Name
          </label>
          <input
            className="w-full p-4 border-[1.5px] border-black"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Operating City
          </label>
          <input
            className="w-full p-4 border-[1.5px] border-black"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Logistics Address
          </label>
          <input
            className="w-full p-4 border-[1.5px] border-black"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="md:col-span-2 py-5 bg-black text-white text-[10px] font-black uppercase tracking-widest"
        >
          {isSaving ? "Synchronizing..." : "Commit Registry Changes"}
        </button>
      </form>
    </div>
  );
}
