import React from "react";
import Image from "next/image";
import { getLivePartnersData } from "@/lib/truckersmp";

export default async function Partners() {
  const partners = await getLivePartnersData();
  return (
    <section
      id="partners"
      className="w-full py-20 px-6 border-t border-white/5 bg-[#121418]/30"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-logistics-orange">
            Official Alliances
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white font-mono">
            Our Partners
          </h2>
          <div className="w-12 h-[3px] bg-logistics-orange mx-auto rounded" />
        </div>

        {partners.length === 0 ? (
          <p className="text-center text-sm text-logistics-gray-text py-6">
            Alliance roster currently quiet or loading records.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-logistics-steel border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-logistics-orange/20 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-24 bg-logistics-dark">
                    <Image
                      src={partner.coverUrl}
                      alt=""
                      fill
                      className="object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-logistics-steel via-transparent to-transparent" />

                    <span
                      className={`absolute top-3 right-3 text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border font-black ${
                        partner.recruiting
                          ? "bg-emerald-500/80 backdrop-blur-sm text-white border-emerald-400/20"
                          : "bg-black/60 backdrop-blur-sm text-logistics-gray-text border-white/10"
                      }`}
                    >
                      {partner.recruiting ? "Recruiting" : "Closed"}
                    </span>
                  </div>

                  <div className="px-6 pb-2 relative -mt-8 z-10 flex items-end gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-logistics-steel bg-logistics-dark shadow-xl">
                      <Image
                        src={partner.logoUrl}
                        alt={partner.name}
                        fill
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="px-6 pt-3">
                    <h3 className="font-mono font-black text-white text-base group-hover:text-logistics-orange transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-logistics-gold font-bold font-mono tracking-tight mt-0.5 italic">
                      "{partner.subName}"
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4">
                  <div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-2 text-center text-xs font-mono font-bold">
                    <a
                      href={partner.tmpUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-logistics-dark hover:bg-logistics-orange text-white py-2.5 rounded-xl border border-white/5 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <img
                        src="https://truckersmp.com/assets/img/truckersmp-logo-sm.png"
                        alt="TMP"
                        className="h-5 object-contain brightness-0 invert group-hover/btn:brightness-100 group-hover/btn:invert-0 transition-all duration-200"
                      />
                    </a>

                    {partner.discord ? (
                      <a
                        href={partner.discord}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#5865F2]/10 hover:bg-[#5865F2] text-[#5865F2] hover:text-white py-2.5 rounded-xl border border-[#5865F2]/20 transition-all flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4 fill-current transition-colors"
                          viewBox="0 0 127.14 96.36"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a74.37,74.37,0,0,0,6.72-10.93,68.6,68.6,0,0,1-10.64-5.12c.91-.67,1.81-1.37,2.65-2.1a75.22,75.22,0,0,0,72.76,0c.84.73,1.74,1.43,2.65,2.1a68.86,68.86,0,0,1-10.64,5.12,74.74,74.74,0,0,0,6.72,10.93,105.73,105.73,0,0,0,31.59-18.83C129.54,50.49,123.6,27.69,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.88,46,53.7,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.12,46,95.94,53,91,65.69,84.69,65.69Z" />
                        </svg>
                        Discord
                      </a>
                    ) : (
                      <div className="bg-white/5 text-logistics-gray-text py-2.5 rounded-xl border border-white/5 opacity-50 cursor-not-allowed flex items-center justify-center">
                        No Server
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
