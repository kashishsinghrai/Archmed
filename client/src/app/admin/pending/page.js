"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Clock, CheckCircle, MapPin, Loader2 } from "lucide-react";

export default function PendingRequests() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const { data } = await api.get("/api/admin/pending");
        setHospitals(data);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    setProcessingId(id);
    try {
      await api.put("/api/admin/verify", {
        id,
        status: "Approved",
      });

      setHospitals(hospitals.filter((h) => h._id !== id));
    } catch (err) {
      alert("Action failed. Please check server logs.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <p className="text-sm text-slate-500">
            Loading verification queue...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-light text-slate-900 dark:text-white">
          Verification Queue
        </h1>
        <p className="text-sm text-slate-500">
          Review and approve new facility registrations
        </p>
      </div>

      {/* Hospital Grid */}
      {hospitals.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center">
          <Clock
            size={48}
            className="mx-auto mb-4 text-slate-300 dark:text-slate-700"
          />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            No Pending Requests
          </h3>
          <p className="text-sm text-slate-500">
            All applications have been processed.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {hospitals.map((h) => (
            <div
              key={h._id}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
                    {h.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-lg">
                    <Clock
                      size={14}
                      className="text-amber-600 dark:text-amber-400"
                    />
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                      Pending Review
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
                    {h.address}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-medium text-slate-500">
                    License: {h.licenseNumber}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={processingId === h._id}
                  onClick={() => handleApprove(h._id)}
                  className="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingId === h._id ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Approve Facility
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
