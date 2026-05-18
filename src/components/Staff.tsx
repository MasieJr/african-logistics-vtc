import Image from "next/image";
import { getVtcStaff } from "@/lib/truckersmp";

export default async function Staff() {
  const liveStaff = await getVtcStaff();
  return (
    <section
      id="team"
      className="w-full py-20 px-6 border-t border-white/5 bg-gradient-to-b from-logistics-dark to-logistics-steel/10"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-logistics-gold">
            Fleet Command Hub
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Meet The Team
          </h2>
          <div className="w-12 h-[3px] bg-logistics-gold mx-auto rounded" />
        </div>

        {liveStaff.length === 0 ? (
          <p className="text-center text-sm text-logistics-gray-text">
            Command roster momentarily offline.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {liveStaff.map((staff, index) => (
              <div
                key={index}
                className="bg-logistics-steel border border-white/5 rounded-2xl p-6 text-center flex flex-col items-center group hover:border-logistics-gold/20 transition-all shadow-lg"
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-4 border-2 border-white/5 group-hover:border-logistics-gold/30 transition-colors bg-logistics-dark shadow-inner">
                  <Image
                    src={
                      staff.avatar ||
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                    }
                    alt={staff.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-mono font-black text-base text-white tracking-wide truncate max-w-full">
                  {staff.name}
                </h3>
                <p className="text-[11px] text-logistics-gold font-bold uppercase tracking-wider mt-1 bg-logistics-gold/5 border border-logistics-gold/10 px-2.5 py-0.5 rounded">
                  {staff.role}
                </p>

                <a
                  href={`https://truckersmp.com/user/${staff.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-mono tracking-widest text-logistics-gray-text hover:text-white mt-4 border border-white/5 hover:border-white/10 px-2 py-1 rounded transition-colors"
                >
                  TMP ID: {staff.id} ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
