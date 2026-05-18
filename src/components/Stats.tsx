import React from "react";

const metrics = [
  { value: "150+", label: "Active Drivers" },
  { value: "450k+", label: "Kilometers Logged" },
  { value: "1,200+", label: "Deliveries Approved" },
  { value: "24/7", label: "Convoy Support" },
];

export default function Stats() {
  return (
    <section className="w-full py-16 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((stat, idx) => (
            <div
              key={idx}
              className="bg-logistics-steel/50 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center shadow-lg hover:border-logistics-gold/20 transition-all duration-300"
            >
              <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {stat.value}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-logistics-gray-text">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
