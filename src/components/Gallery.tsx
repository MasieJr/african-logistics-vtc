import React from "react";

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full py-20 px-6 border-t border-white/5 bg-[#121418]/30"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <div className="w-[20%] h-[3px] bg-logistics-gold mx-auto rounded" />
          <h2 className="text-4xl font-black uppercase text-logistics-gold">
            Gallery
          </h2>
          <div className="w-[20%] h-[3px] bg-logistics-gold mx-auto rounded" />
        </div>
        <p className="text-logistics-gray-text mt-2">
          Snapshots from our convoys, heavy hauls, and pilot vehicle escorts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {/* Image placeholders */}
          <div className="aspect-video bg-logistics-steel border border-white/5 rounded-xl animate-pulse" />
          <div className="aspect-video bg-logistics-steel border border-white/5 rounded-xl animate-pulse" />
          <div className="aspect-video bg-logistics-steel border border-white/5 rounded-xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}
