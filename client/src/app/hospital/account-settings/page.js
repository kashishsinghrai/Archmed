"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { Lock, ShieldCheck, RefreshCw, KeyRound } from "lucide-react";

export default function AccountSettings() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert("New passwords do not match.");
    }

    setIsUpdating(true);
    try {
      await api.put("/api/hospital/change-password", {
        oldPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      alert("Access Key Updated.");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Security Update Failed");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-12 animate-in fade-in duration-700">
      <header className="border-b-[1.5px] border-black pb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-rose-600 uppercase tracking-[0.3em] mb-4">
          <Lock size={14} /> Security Node
        </div>
        <h1 className="text-4xl font-light tracking-tighter text-black dark:text-white">
          Account Auth
        </h1>
        <p className="text-slate-500 text-sm mt-2 italic">
          Update your secure access credentials.
        </p>
      </header>

      <div className="p-8 border-[1.5px] border-black bg-white dark:bg-slate-900 space-y-8 shadow-sm">
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Current Access Key
            </label>
            <input
              type="password"
              required
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm outline-none focus:ring-1 focus:ring-black"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                New Access Key
              </label>
              <input
                type="password"
                required
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm outline-none focus:ring-1 focus:ring-black"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Confirm Key
              </label>
              <input
                type="password"
                required
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm outline-none focus:ring-1 focus:ring-black"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-4 flex gap-4 border-l-4 border-black">
            <KeyRound size={20} className="shrink-0 text-slate-400" />
            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
              Passwords must be unique. Updating this node will terminate all
              other active sessions.
            </p>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full py-5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              <ShieldCheck size={16} />
            )}
            Re-Authorize Node
          </button>
        </form>
      </div>
    </div>
  );
}
