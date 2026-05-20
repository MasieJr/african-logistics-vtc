import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-logistics-steel/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="African Logistics Logo"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-logistics-gray-text">
          <Link
            href="#"
            className="hover:text-white transition-colors text-white"
          >
            Home
          </Link>
          <Link href="#about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="#events" className="hover:text-white transition-colors">
            Upcoming Convoys
          </Link>
          <Link href="#team" className="hover:text-white transition-colors">
            Meet The Team
          </Link>
          <Link href="#partners" className="hover:text-white transition-colors">
            Our Partners
          </Link>
          <Link href="#apply" className="hover:text-white transition-colors">
            Application
          </Link>
          <Link
            href="https://discord.gg/your-link"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            Discord ↗
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            href="#"
            className="bg-logistics-orange hover:bg-logistics-orange/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md shadow-logistics-orange/10"
          >
            Driver Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}
