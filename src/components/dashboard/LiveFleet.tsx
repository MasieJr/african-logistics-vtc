import React from "react";
import { getLiveFleetStatus } from "@/lib/truckersmp";
import Image from "next/image";

export default async function LiveFleet() {
  const fleet = await getLiveFleetStatus();

  return (
    <div className="bg-logistics-steel border border-white/5 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">
            TruckersMP Live Fleet
          </h3>
          <p className="text-xs text-logistics-gray-text mt-0.5">
            Real-time tracking of VTC members
          </p>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
          Live Sync
        </span>
      </div>

      {fleet.length === 0 ? (
        <p className="text-xs text-logistics-gray-text py-4 text-center">
          No drivers connected to API manifest.
        </p>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {fleet.slice(0, 5).map((driver) => (
            <div
              key={driver.id}
              className="bg-logistics-dark/60 border border-white/5 rounded-xl p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-logistics-steel">
                  <Image
                    src={
                      driver.avatar ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                    }
                    alt={driver.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {driver.name}
                  </h4>
                  <p className="text-[10px] text-logistics-gray-text font-mono">
                    TMP ID: {driver.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${driver.isOnline ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-neutral-600"}`}
                />
                <span className="text-xs font-medium text-logistics-gray-text">
                  {driver.isOnline ? driver.gameServer : "Offline"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
