"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Calendar,
  UserCircle,
  LogOut,
  Menu,
  X,
  Activity,
  Globe,
  ShieldCheck,
} from "lucide-react";

export default function PatientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/patient", icon: LayoutDashboard },
    { name: "Node Search", href: "/patient/search", icon: Search },
    { name: "Registry", href: "/patient/appointments", icon: Calendar },
    { name: "Identity Profile", href: "/patient/profile", icon: UserCircle },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.replace("/patient/login");
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-100">
      {/* --- Mobile Header --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white dark:bg-slate-900 border-b-[1.5px] border-black dark:border-slate-800 px-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="bg-black dark:bg-white p-1.5 rounded">
            <Activity className="text-white dark:text-black" size={18} />
          </div>
          <span className="text-sm font-black uppercase tracking-tighter">
            Archmed
          </span>
        </div>
        <button
          className="p-2 border-[1.5px] border-black dark:border-white rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* --- Sidebar Sidebar --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[60] w-72 bg-white dark:bg-slate-900 border-r-[1.5px] border-black dark:border-slate-800 transform transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="p-8 border-b-[1.5px] border-black dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="bg-black dark:bg-white p-2 rounded">
                <span className="text-white dark:text-black font-black text-xs italic">
                  A
                </span>
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-tighter leading-none">
                  Archmed Pro
                </h2>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 leading-none">
                  Patient Node
                </p>
              </div>
            </div>
          </div>

          {/* Registry Navigation */}
          <nav className="flex-1 px-4 py-10 space-y-2">
            <p className="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              System Menu
            </p>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-5 py-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border-[1.5px] ${
                  isActive(item.href)
                    ? "bg-black text-white border-black dark:bg-white dark:text-black shadow-xl"
                    : "text-slate-500 border-transparent hover:border-black dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={16}
                    strokeWidth={isActive(item.href) ? 2.5 : 1.5}
                  />
                  {item.name}
                </div>
                {isActive(item.href) && (
                  <ShieldCheck size={12} className="text-emerald-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* Network Connection Status */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 m-4 border border-dashed border-slate-300 dark:border-slate-700 hidden lg:block">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
              <Globe size={12} /> Registry Connection
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                Node Active: UP-West
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 border-t-[1.5px] border-black dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-4 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-[11px] font-black uppercase tracking-[0.2em] transition-all"
            >
              <LogOut size={16} />
              Terminate Session
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Workspace --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pt-20 lg:pt-0">
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 scroll-smooth">
          {children}

          {/* Subtle Workspace Footer */}
          <footer className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 opacity-40 italic">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Archmed Patient Protocol v2.0
            </p>
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest">
              <span>Security Level: 02</span>
              <span>Encrypted Connection</span>
            </div>
          </footer>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[55] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
