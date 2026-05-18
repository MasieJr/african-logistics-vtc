import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import JobLogForm from "@/components/dashboard/JobLogForm";
import LiveFleet from "@/components/dashboard/LiveFleet";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  // 1. Server-side Authentication Guard
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. Telemetry Queries from PostgreSQL database
  const driverJobs = await prisma.job.findMany({
    where: { driverId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  // 3. Mathematical Metric Reductions
  const approvedJobs = driverJobs.filter((j) => j.status === "APPROVED");
  const totalDistance = approvedJobs.reduce((sum, j) => sum + j.distanceKm, 0);
  const totalEarnings = approvedJobs.reduce((sum, j) => sum + j.income, 0);
  const totalFuel = approvedJobs.reduce((sum, j) => sum + j.fuelUsedLiters, 0);

  return (
    <div className="min-h-screen bg-[#0d0e10] text-[#e2e8f0] selection:bg-logistics-orange selection:text-white font-sans antialiased">
      {/* GLOBAL HUB TERMINAL HEADER */}
      <header className="border-b border-white/5 bg-[#121418]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Brand/System Tag */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-sm font-black tracking-widest text-white uppercase">
                AFRICAN LOGISTICS
                <span className="text-logistics-orange">.</span>
              </span>
            </Link>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <span className="text-[10px] font-mono tracking-widest bg-logistics-orange/10 text-logistics-orange px-2.5 py-0.5 rounded border border-logistics-orange/20 uppercase font-bold">
              Operational Terminal Live
            </span>
          </div>

          {/* Secure Identity Token Card */}
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-logistics-orange to-logistics-gold p-[1px]">
                <div className="w-full h-full bg-[#121418] rounded-[11px] flex items-center justify-center font-mono font-black text-white text-sm">
                  {session.user.name?.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">
                  {session.user.name}
                </p>
                <p className="text-[11px] text-logistics-gold font-mono font-bold tracking-wider mt-0.5">
                  {session.user.driverNumber || "ALV-PENDING"}
                </p>
              </div>
            </div>

            <Link
              href="/api/auth/signout"
              className="text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-logistics-orange/20 hover:text-logistics-orange border border-white/10 px-4 py-2.5 rounded-xl transition-all"
            >
              Disconnect
            </Link>
          </div>
        </div>
      </header>

      {/* CORE INDUSTRIAL CONTROL PANEL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: KEY PERFORMANCE TELEMETRY CRITIQUE (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* VTC DASHBOARD TELEMETRY counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#121418] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-logistics-gray-text">
                  Distance Logged
                </p>
                <p className="text-3xl font-black mt-3 font-mono text-white tracking-tight">
                  {totalDistance.toLocaleString()}{" "}
                  <span className="text-xs text-logistics-gold">KM</span>
                </p>
                <div className="absolute -bottom-4 -right-4 text-white/[0.02] font-black text-6xl pointer-events-none select-none font-mono">
                  KM
                </div>
              </div>

              <div className="bg-[#121418] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-logistics-gray-text">
                  Company Revenue
                </p>
                <p className="text-3xl font-black mt-3 font-mono text-white tracking-tight">
                  R {totalEarnings.toLocaleString()}
                </p>
                <div className="absolute -bottom-4 -right-4 text-white/[0.02] font-black text-6xl pointer-events-none select-none font-mono">
                  ZAR
                </div>
              </div>

              <div className="bg-[#121418] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-logistics-gray-text">
                  Avg Fuel Burn
                </p>
                <p className="text-3xl font-black mt-3 font-mono text-white tracking-tight">
                  {approvedJobs.length > 0
                    ? (totalFuel / approvedJobs.length).toFixed(1)
                    : "0.0"}{" "}
                  <span className="text-xs text-logistics-orange">L</span>
                </p>
                <div className="absolute -bottom-4 -right-4 text-white/[0.02] font-black text-6xl pointer-events-none select-none font-mono">
                  AVG
                </div>
              </div>
            </div>

            {/* DRIVER DELIVERY MANIFEST BLOCK */}
            <div className="bg-[#121418] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
              <div className="border-b border-white/5 px-6 py-5 flex justify-between items-center bg-[#16191f]/40">
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider text-white">
                    Freight manifest Ledger
                  </h3>
                  <p className="text-xs text-logistics-gray-text mt-0.5">
                    Historical verification log data
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-white/5 border border-white/10 text-white px-3 py-1 rounded-lg">
                  Total Records: {driverJobs.length}
                </span>
              </div>

              {driverJobs.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-sm text-logistics-gray-text">
                    Terminal ready. No simulation telemetry logs filed yet.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/5 max-h-[520px] overflow-y-auto custom-scrollbar">
                  {driverJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-sm font-black tracking-wide text-white font-mono">
                            {job.departureCity}
                          </span>
                          <span className="text-logistics-orange font-bold text-xs">
                            ➔
                          </span>
                          <span className="text-sm font-black tracking-wide text-white font-mono">
                            {job.arrivalCity}
                          </span>
                        </div>
                        <p className="text-xs text-logistics-gray-text font-medium">
                          Cargo:{" "}
                          <span className="text-white font-semibold">
                            {job.cargo}
                          </span>{" "}
                          • Distance:{" "}
                          <span className="text-[#e2e8f0] font-mono">
                            {job.distanceKm} KM
                          </span>{" "}
                          • Fuel:{" "}
                          <span className="text-[#e2e8f0] font-mono">
                            {job.fuelUsedLiters}L
                          </span>
                        </p>
                      </div>

                      <div className="flex sm:flex-col justify-between sm:items-end items-center border-t sm:border-none pt-3 sm:pt-0 border-white/5">
                        <span className="font-mono text-sm font-black text-logistics-gold tracking-wide">
                          R {job.income.toLocaleString()}
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mt-1 border ${
                            job.status === "APPROVED"
                              ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20"
                              : job.status === "REJECTED"
                                ? "bg-rose-500/5 text-rose-400 border-rose-500/20"
                                : "bg-amber-500/5 text-amber-400 border-amber-500/20 animate-pulse"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: LIVE API FEEDS & SYSTEM CONTROLS (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            {/* TRUCKERSMP LIVE FLEET STATUS CARD */}
            <LiveFleet />

            {/* INTERACTIVE DATA LOGGER WORKSTATION */}
            <div className="bg-[#121418] border border-white/5 rounded-2xl p-6 shadow-xl relative">
              <div className="mb-6">
                <h3 className="text-base font-black uppercase tracking-wider text-white">
                  Log Live Dispatch
                </h3>
                <p className="text-xs text-logistics-gray-text mt-0.5">
                  Submit active telemetry directly into core operations
                </p>
              </div>
              <JobLogForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
