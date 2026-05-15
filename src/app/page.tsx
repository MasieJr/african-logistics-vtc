import React from "react";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";

export default function Home() {
  return (
    <div className="min-h-screen bg-logistics-dark selection:bg-logistics-gold selection:text-black">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        <Hero />
        <Stats />
      </main>

      {/* Basic Footer placeholder */}
      <footer className="w-full py-8 text-center text-xs text-logistics-gray-text border-t border-white/5 mt-12 bg-logistics-steel/20">
        &copy; {new Date().getFullYear()} African Logistics VTC. All virtual
        rights reserved.
      </footer>
    </div>
  );
}
