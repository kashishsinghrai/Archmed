"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  UserPlus,
  Calendar,
  Settings,
  LogOut,
  Building2, // Profile के लिए नया आइकन
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function HospitalLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.replace("/login");
  };

  // एक्टिव लिंक को पहचानने के लिए फंक्शन
  const isActive = (path) => pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 antialiased">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r-[1.5px] border-black dark:border-slate-800 hidden md:flex flex-col sticky top-0 h-screen">
        {/* Logo Section */}
        <div className="p-8 border-b-[1.5px] border-black dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-black dark:bg-white p-2 rounded-lg">
              <span className="text-white dark:text-black font-black text-xs italic">
                A
              </span>
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
                Archmed Pro
              </h2>
              <p className="text-[9px] text-slate-400 mt-1 font-bold tracking-[0.2em] uppercase leading-none">
                Hospital Node
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          <p className="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Management
          </p>

          {/* Dashboard */}
          <Link
            href="/hospital"
            className={`group flex items-center gap-3 px-4 py-3 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 border-[1.5px] ${
              isActive("/hospital")
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "text-slate-500 border-transparent hover:border-black dark:hover:border-slate-700"
            }`}
          >
            <LayoutDashboard
              size={16}
              strokeWidth={isActive("/hospital") ? 2.5 : 1.5}
            />
            <span>Dashboard</span>
          </Link>

          {/* Doctors */}
          <Link
            href="/hospital/doctors"
            className={`group flex items-center gap-3 px-4 py-3 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 border-[1.5px] ${
              isActive("/hospital/doctors")
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "text-slate-500 border-transparent hover:border-black dark:hover:border-slate-700"
            }`}
          >
            <UserPlus
              size={16}
              strokeWidth={isActive("/hospital/doctors") ? 2.5 : 1.5}
            />
            <span>Doctors</span>
          </Link>

          {/* Appointments */}
          <Link
            href="/hospital/appointments"
            className={`group flex items-center gap-3 px-4 py-3 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 border-[1.5px] ${
              isActive("/hospital/appointments")
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "text-slate-500 border-transparent hover:border-black dark:hover:border-slate-700"
            }`}
          >
            <Calendar
              size={16}
              strokeWidth={isActive("/hospital/appointments") ? 2.5 : 1.5}
            />
            <span>Appointments</span>
          </Link>

          <div className="my-6 border-t-[1.5px] border-black/5 dark:border-slate-800"></div>
          <p className="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Configuration
          </p>

          {/* ✅ New: Profile Section (Settings के पास) */}
          <Link
            href="/hospital/settings" // यहाँ आप /hospital/profile भी रख सकते हैं
            className={`group flex items-center gap-3 px-4 py-3 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 border-[1.5px] ${
              isActive("/hospital/settings")
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "text-slate-500 border-transparent hover:border-black dark:hover:border-slate-700"
            }`}
          >
            <Building2
              size={16}
              strokeWidth={isActive("/hospital/settings") ? 2.5 : 1.5}
            />
            <span>Facility Profile</span>
          </Link>

          {/* Settings */}
          <Link
            href="/hospital/account-settings"
            className={`group flex items-center gap-3 px-4 py-3 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 border-[1.5px] ${
              isActive("/hospital/account-settings")
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "text-slate-500 border-transparent hover:border-black dark:hover:border-slate-700"
            }`}
          >
            <Settings
              size={16}
              strokeWidth={isActive("/hospital/account-settings") ? 2.5 : 1.5}
            />
            <span>Account</span>
          </Link>
        </nav>

        {/* Logout Section */}
        <div className="p-6 border-t-[1.5px] border-black dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 px-4 py-3 text-[11px] font-black text-rose-500 uppercase tracking-[0.2em] hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
          >
            <LogOut size={16} />
            <span>Logout Node</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full p-8 lg:p-12 max-w-7xl mx-auto">
          {children}

          {/* Subtle Branding Footer */}
          <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-900 flex justify-between items-center opacity-40">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Archmed Infrastructure © 2026
            </p>
            <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest">
              <span>Secure Connection</span>
              <span className="text-emerald-500 underline decoration-2">
                Node Active
              </span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
