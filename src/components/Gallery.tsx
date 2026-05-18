import React from "react";

export default function Gallery() {
  return (
    <section id="gallery" className="min-h-screen bg-logistics-dark text-white">
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black uppercase text-white">
          Fleet <span className="text-logistics-gold">Gallery</span>
        </h1>
        <p className="text-logistics-gray-text mt-2">
          Snapshots from our convoys, heavy hauls, and pilot vehicle escorts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {/* Image placeholders */}
          <div className="aspect-video bg-logistics-steel border border-white/5 rounded-xl animate-pulse" />
          <div className="aspect-video bg-logistics-steel border border-white/5 rounded-xl animate-pulse" />
          <div className="aspect-video bg-logistics-steel border border-white/5 rounded-xl animate-pulse" />
        </div>
      </main>
    </section>
  );
}
