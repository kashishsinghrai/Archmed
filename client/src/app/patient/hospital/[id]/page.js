"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useParams } from "next/navigation";
import {
  MapPin,
  Calendar,
  CheckCircle,
  ShieldCheck,
  X,
  Loader2,
} from "lucide-react";

export default function HospitalProfile() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/api/patient/hospital/${id}`);
        setHospital(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingDate) return alert("Please select a date");

    setIsBooking(true);
    try {
      // ✅ Linking to your Controller logic: exports.bookAppointment
      await api.post("/api/patient/book", {
        doctorId: selectedDoctor._id,
        hospitalId: id,
        date: bookingDate,
      });

      alert("Node Synchronized: Appointment request sent successfully.");
      setIsModalOpen(false);
      setBookingDate("");
    } catch (err) {
      alert(
        err.response?.data?.message || "Infrastructure Error: Booking failed",
      );
    } finally {
      setIsBooking(false);
    }
  };

  if (loading || !hospital)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2
          className="animate-spin text-black"
          size={24}
          strokeWidth={1}
        />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-700 bg-white min-h-screen text-black antialiased">
      {/* Hospital Header */}
      <header className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b-[1.5px] border-black pb-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">
            <ShieldCheck size={14} /> Verified Facility Node
          </div>
          <h1 className="text-5xl font-medium tracking-tighter">
            {hospital.name}
          </h1>
          <p className="text-slate-500 flex items-center gap-2 font-medium">
            <MapPin size={18} strokeWidth={1.5} /> {hospital.address}
          </p>
        </div>
        <div className="bg-slate-900 p-10 text-white flex flex-col justify-between border-[1.5px] border-black">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
            Network License
          </p>
          <p className="text-3xl font-light tracking-widest">
            {hospital.licenseNumber}
          </p>
        </div>
      </header>

      {/* Specialists Table */}
      <div className="space-y-8">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Available Specialists
        </h2>
        <div className="border-[1.5px] border-black divide-y-[1.5px] divide-black">
          {hospital.doctors?.map((doc) => (
            <div
              key={doc._id}
              className="p-8 grid grid-cols-1 md:grid-cols-4 items-center gap-8 hover:bg-slate-50 transition-colors"
            >
              <div>
                <p className="text-lg font-medium tracking-tight">
                  Dr. {doc.name}
                </p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                  {doc.specialization}
                </p>
              </div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">
                {doc.experience} Years Experience • {doc.degree}
              </div>
              <div className="text-2xl font-light tracking-tight">
                ₹{doc.fees}{" "}
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2 font-mono">
                  Cons.
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedDoctor(doc);
                  setIsModalOpen(true);
                }}
                className="w-full py-4 border-[1.5px] border-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all active:scale-95"
              >
                Request Slot
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- INDUSTRIAL BOOKING MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white border-[1.5px] border-black w-full max-w-md p-10 space-y-8 shadow-2xl">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                  Booking Node
                </h3>
                <p className="text-2xl font-medium tracking-tight text-black">
                  Dr. {selectedDoctor.name}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:rotate-90 transition-transform"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleBooking} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-4 bg-slate-50 border-[1.5px] border-black text-sm font-bold uppercase tracking-widest outline-none focus:bg-white"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 flex gap-3">
                <ShieldCheck className="text-blue-600 shrink-0" size={18} />
                <p className="text-[10px] text-blue-700 font-bold uppercase leading-relaxed tracking-wide">
                  Patient data will be encrypted and synced with the hospital
                  engine upon confirmation.
                </p>
              </div>

              <button
                type="submit"
                disabled={isBooking}
                className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isBooking ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  "Confirm Synchronization"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
