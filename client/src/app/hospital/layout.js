"use client";
import { useState } from "react"; // मोबाइल मेनू कंट्रोल करने के लिए
import Link from "next/link";
import {
  LayoutDashboard,
  UserPlus,
  Calendar,
  Settings,
  LogOut,
  Building2,
  Menu, // मोबाइल आइकन
  X, // मोबाइल आइकन
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function HospitalLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false); // मोबाइल स्टेट
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.replace("/login");
  };

  const isActive = (path) => pathname === path;

  // नेविगेशन लिंक्स (कोड छोटा करने के लिए)
  const navLinks = [
    { name: "Dashboard", path: "/hospital", icon: LayoutDashboard },
    { name: "Doctors", path: "/hospital/doctors", icon: UserPlus },
    { name: "Appointments", path: "/hospital/appointments", icon: Calendar },
    { name: "Facility Profile", path: "/hospital/settings", icon: Building2 },
    { name: "Account", path: "/hospital/account-settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 antialiased">
      {/* 📱 Mobile Header (केवल मोबाइल पर दिखेगा) */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b-[1.5px] border-black z-50 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-black dark:bg-white p-1 rounded">
            <span className="text-white dark:text-black font-black text-[10px] italic px-1">
              A
            </span>
          </div>
          <h2 className="text-xs font-black uppercase tracking-tighter italic">
            Archmed
          </h2>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 border-[1.5px] border-black"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 🖥️ Desktop Sidebar (MD से ऊपर) & 📱 Mobile Drawer (Overlay) */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-white dark:bg-slate-900 border-r-[1.5px] border-black flex flex-col transition-transform duration-300
        md:sticky md:top-0 md:h-screen md:translate-x-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo Section */}
        <div className="p-8 border-b-[1.5px] border-black dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-black dark:bg-white p-2 rounded-lg">
              <span className="text-white dark:text-black font-black text-xs italic">
                A
              </span>
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-tighter leading-none">
                Archmed Pro
              </h2>
              <p className="text-[9px] text-slate-400 mt-1 font-bold tracking-[0.2em] uppercase leading-none">
                Hospital Node
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <p className="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Management
          </p>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsMobileOpen(false)} // लिंक क्लिक पर मोबाइल मेनू बंद
              className={`group flex items-center gap-3 px-4 py-3 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 border-[1.5px] ${
                isActive(link.path)
                  ? "bg-black text-white border-black dark:bg-white dark:text-black"
                  : "text-slate-500 border-transparent hover:border-black dark:hover:border-slate-700"
              }`}
            >
              <link.icon
                size={16}
                strokeWidth={isActive(link.path) ? 2.5 : 1.5}
              />
              <span>{link.name}</span>
            </Link>
          ))}
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

      {/* 🌑 Mobile Overlay (जब मेनू खुला हो तो बैकग्राउंड काला करना) */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-[55] md:hidden backdrop-blur-sm"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0">
        <div className="min-h-full p-6 lg:p-12 max-w-7xl mx-auto">
          {children}

          <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
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
