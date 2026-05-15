import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 bg-gradient-to-b from-logistics-steel/30 to-logistics-dark">
      {/* Visual Background Accent*/}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,169,60,0.08),transparent_50%)]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-logistics-gold px-3 py-1 bg-logistics-gold/10 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-logistics-gold animate-pulse" />
          Now Recruiting Truckers
        </span>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
          HAULING WITHOUT BORDERS.
          <br />
          DELIVERING <span className="text-logistics-gold">EXCELLENCE</span>.
        </h1>

        <p className="mt-6 text-logistics-gray-text text-lg sm:text-xl max-w-2xl mx-auto font-light">
          Connect, log jobs, and conquer the virtual roads from Cape Town to
          Cairo. Join Africa's premier simulation logistics network today.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#apply"
            className="w-full sm:w-auto bg-logistics-orange hover:bg-logistics-orange/90 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-logistics-orange/20 text-center"
          >
            Join Our Virtual Company
          </a>
          <a
            href="#fleet"
            className="w-full sm:w-auto bg-logistics-steel hover:bg-white/5 border border-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-all text-center"
          >
            Explore the Garage
          </a>
        </div>
      </div>
    </section>
  );
}
