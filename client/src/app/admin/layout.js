"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  LogOut,
  Loader2,
  Menu,
  X,
  Bell,
  ChevronRight,
  ShieldCheck,
  Globe,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // States
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState("Super Admin");

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const checkAuth = () => {
      const userInfo =
        typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;
      const user = userInfo ? JSON.parse(userInfo) : null;

      if (!user || user.role !== "admin") {
        router.replace("/admin/login");
      } else {
        setAdminName(user.name || "Super Admin");
        setAuthorized(true);
        setChecking(false); 
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.replace("/admin/login");
  };

  const isActive = (path) => pathname === path;

  // --- Early Returns for Cleaner Render Logic ---

  if (pathname === "/admin/login") {
    return <main className="bg-white dark:bg-slate-950">{children}</main>;
  }

  // ऑथेंटिकेशन चेक लोडर
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            className="w-6 h-6 animate-spin text-black dark:text-white"
            strokeWidth={1}
          />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            Authenticating Node...
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
      {/* SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r-[1.5px] border-black dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-8 flex items-center justify-between border-b-[1.5px] border-black dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black dark:bg-white rounded flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-sm">
                A
              </span>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tighter italic">
                Archmed Pro
              </h2>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mt-1">
                Infrastructure
              </p>
            </div>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <p className="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Menu Node
          </p>
          {[
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Pending Requests", href: "/admin/pending", icon: Clock },
            {
              name: "Approved Network",
              href: "/admin/approved",
              icon: CheckCircle,
            },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group flex items-center justify-between px-4 py-3 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 border-[1.5px] ${
                isActive(item.href)
                  ? "bg-black text-white border-black dark:bg-white dark:text-black"
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
              {isActive(item.href) && <ChevronRight size={12} />}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t-[1.5px] border-black dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-[11px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
          >
            <LogOut size={16} /> Logout Node
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white dark:bg-slate-950 border-b-[1.5px] border-black dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 border border-black"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Globe size={14} />
              <span>Root</span>
              <ChevronRight size={10} />
              <span className="text-black dark:text-white">
                {pathname.split("/")[2] || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-slate-400 hover:text-black transition-colors relative">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            </button>
            <div className="h-8 w-[1.5px] bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-tight leading-none">
                  {adminName}
                </p>
                <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mt-1">
                  Superuser
                </p>
              </div>
              <div className="w-10 h-10 border-[1.5px] border-black dark:border-white rounded-full flex items-center justify-center overflow-hidden bg-slate-100">
                <ShieldCheck size={20} className="text-black" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth">
          {children}
          <footer className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 opacity-40">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2026 Archmed Infrastructure
            </p>
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
              <span>Security Level: 04</span>
              <span>Uptime: 99.9%</span>
            </div>
          </footer>
        </main>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
