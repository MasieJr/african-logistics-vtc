import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-logistics-steel/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-wider text-white group-hover:text-logistics-gold transition-colors">
            AFRICAN LOGISTICS<span className="text-logistics-gold">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-logistics-gray-text">
          <Link href="#about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="#fleet" className="hover:text-white transition-colors">
            Our Fleet
          </Link>
          <Link href="#routes" className="hover:text-white transition-colors">
            Convoys
          </Link>
        </div>

        {/* Portal CTAs */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-white hover:text-logistics-gold transition-colors px-4 py-2"
          >
            Driver Portal
          </Link>
          <Link
            href="#apply"
            className="bg-logistics-orange hover:bg-logistics-orange/90 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-md shadow-logistics-orange/10"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
