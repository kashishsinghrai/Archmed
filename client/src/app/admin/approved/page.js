"use client";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axios";
import {
  CheckCircle,
  MapPin,
  Mail,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function ApprovedHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suspendingId, setSuspendingId] = useState(null);

  const fetchApproved = useCallback(async () => {
    try {
      const { data } = await api.get("/api/admin/approved");
      setHospitals(data);
    } catch (err) {
      console.error("Failed to sync approved network:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApproved();
  }, [fetchApproved]);

  const handleRevoke = async (id) => {
    const isConfirmed = window.confirm(
      "This will immediately revoke the hospital's access to the system. Continue?",
    );
    if (!isConfirmed) return;

    setSuspendingId(id);
    try {
      await api.put("/api/admin/verify", {
        id,
        status: "Rejected",
      });
      setHospitals((prev) => prev.filter((h) => h._id !== id));
    } catch (error) {
      alert("System error during suspension. Please try again.");
    } finally {
      setSuspendingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <p className="text-sm text-slate-500">Loading approved network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-light text-slate-900 dark:text-white">
            Approved Network
          </h1>
          <p className="text-sm text-slate-500">
            Verified healthcare providers on Archmed
          </p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 rounded-xl">
          <span className="text-sm font-medium">
            {hospitals.length} Active{" "}
            {hospitals.length === 1 ? "Facility" : "Facilities"}
          </span>
        </div>
      </div>

      {/* Hospital Grid */}
      {hospitals.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center">
          <CheckCircle
            size={48}
            className="mx-auto mb-4 text-slate-300 dark:text-slate-700"
          />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            No Approved Facilities
          </h3>
          <p className="text-sm text-slate-500">
            Approved hospitals will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-1">
                    {hospital.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin
                    size={16}
                    className="text-slate-400 mt-0.5 shrink-0"
                  />
                  <span className="text-slate-600 dark:text-slate-400">
                    {hospital.address}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">
                    {hospital.email}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-medium text-slate-500">
                    License: {hospital.licenseNumber}
                  </span>
                </div>
              </div>

              {/* Specialties */}
              {hospital.specialties && hospital.specialties.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  disabled={suspendingId === hospital._id}
                  onClick={() => handleRevoke(hospital._id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {suspendingId === hospital._id ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} />
                      Suspend Access
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
