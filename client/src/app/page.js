"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  WifiOff,
  Users,
  Activity,
  ArrowRight,
  Lock,
  UserPlus,
  Globe,
  CheckCircle,
  HelpCircle,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 antialiased">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                SSIP Submitted: Archmed Student Startup
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="mx-auto max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 dark:text-white">
                Healthcare Infrastructure for <br />
                <span className="font-bold italic">Rural India</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400 font-medium">
                Archmed-Pro uses a secure node-based architecture to connect
                remote villages with specialized urban medical expertise.
              </p>
            </div>

            {/* ✅ CTA Buttons - Hospital Register Included */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/patient/register"
                className="group flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all w-full sm:w-auto justify-center"
              >
                <UserPlus size={16} /> Join as Patient
              </Link>
              <Link
                href="/register" // ✅ Hospital Registration Link
                className="group flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-black dark:text-white border-[1.5px] border-black dark:border-slate-800 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all w-full sm:w-auto justify-center"
              >
                <Building2 size={16} /> Register Hospital
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION --- */}
      <section
        id="solutions"
        className="py-24 border-y-[1.5px] border-black/5 bg-white dark:bg-slate-900"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
                The Solution
              </h2>
              <h3 className="text-4xl font-light tracking-tight dark:text-white">
                Triple-Node Ecosystem
              </h3>
              <p className="text-slate-500 leading-relaxed italic">
                A unified bridge connecting three critical points of the
                healthcare chain.
              </p>
              <div className="space-y-4">
                {[
                  {
                    t: "Patient Portal",
                    d: "Rural citizens book specialists in 30 seconds.",
                  },
                  {
                    t: "Hospital Engine",
                    d: "SaaS tool for urban clinics to manage remote patient load.",
                  },
                  {
                    t: "Admin Node",
                    d: "Centralized verification for medical licenses and safety.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <CheckCircle
                      className="text-emerald-500 shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="text-sm font-bold dark:text-white uppercase tracking-tight">
                        {item.t}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
              <div className="relative bg-slate-50 dark:bg-slate-800 p-8 rounded-[3rem] border-[1.5px] border-black/5 aspect-square flex flex-col items-center justify-center text-center">
                <Globe
                  className="text-slate-200 dark:text-slate-700 mb-6"
                  size={120}
                  strokeWidth={0.5}
                />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Global Standards
                </p>
                <p className="text-sm font-light mt-2 dark:text-slate-300 px-8">
                  Building the first ABDM-compliant rural health node.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section id="roadmap" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
              Trajectory
            </h2>
            <h3 className="text-3xl font-light dark:text-white">
              2026-2028 Strategic Roadmap
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-[1.5px] border-black dark:border-slate-800 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-black dark:divide-slate-800">
            {[
              {
                phase: "Alpha",
                title: "Core Build",
                date: "Q1 2026",
                desc: "SaaS Hospital Engine deployment.",
              },
              {
                phase: "Beta",
                title: "Regional Expansion",
                date: "Q3 2026",
                desc: "Onboarding 50+ facilities in UP.",
              },
              {
                phase: "v2.0",
                title: "AI Integration",
                date: "Q1 2027",
                desc: "Smart Triage & LLM diagnostics.",
              },
              {
                phase: "Scale",
                title: "National Grid",
                date: "2028",
                desc: "Integration with National Health Stack.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <p className="text-[10px] font-black text-blue-600 mb-2">
                  {step.phase}
                </p>
                <h4 className="font-bold text-sm dark:text-white uppercase tracking-tighter">
                  {step.title}
                </h4>
                <p className="text-[9px] text-slate-400 mb-4 font-bold">
                  {step.date}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OPERATIONAL GUIDE --- */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-20 space-y-4">
            <h3 className="text-3xl font-light dark:text-white">
              How to Deploy Archmed
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Step-by-step System Integration
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="text-4xl font-light text-slate-200">01</div>
              <h4 className="font-bold text-sm uppercase tracking-widest dark:text-white">
                Registration
              </h4>
              <p className="text-xs text-slate-500 leading-loose">
                Hospitals apply via the <strong>Register Hospital</strong>{" "}
                portal using their valid MCI/NMC license.
              </p>
            </div>
            <div className="space-y-6">
              <div className="text-4xl font-light text-slate-200">02</div>
              <h4 className="font-bold text-sm uppercase tracking-widest dark:text-white">
                Verification
              </h4>
              <p className="text-xs text-slate-500 leading-loose">
                Super Admins verify credentials. Once approved, the facility
                becomes a `&quot;`Live Node `&quot;` in the network.
              </p>
            </div>
            <div className="space-y-6">
              <div className="text-4xl font-light text-slate-200">03</div>
              <h4 className="font-bold text-sm uppercase tracking-widest dark:text-white">
                Operation
              </h4>
              <p className="text-xs text-slate-500 leading-loose">
                Patients discover the node, book appointments, and the hospital
                manages them via the SaaS dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t-[1.5px] border-black dark:border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black dark:bg-white rounded flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg italic">
                  A
                </span>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter dark:text-white">
                Archmed Pro
              </h2>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 max-w-sm leading-relaxed">
              Industrial Grade Healthcare Bridge. Build for the next billion
              rural users.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Node Access
              </p>
              <ul className="text-xs space-y-3 font-bold uppercase tracking-tight dark:text-white">
                <li>
                  <Link href="/patient/login" className="hover:underline">
                    Patient Portal
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:underline">
                    Hospital Registration
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:underline">
                    Admin Infrastructure
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Support
              </p>
              <ul className="text-xs space-y-3 font-bold uppercase tracking-tight dark:text-white">
                <li>Documentation</li>
                <li>Privacy Node</li>
                <li>API Status</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-200 dark:border-slate-900 text-[10px] font-bold text-slate-400 text-center uppercase tracking-[0.4em]">
          © 2026 ARCHMED INFRASTRUCTURE • SSIP GUJARAT
        </div>
      </footer>
    </main>
  );
}
