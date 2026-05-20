import { getUpcomingVtcEvents } from "@/lib/truckersmp";
import Image from "next/image";
import { Gamepad2, Server, Truck, UsersRound } from "lucide-react";
import EventIcons from "./EventIcons";

export default async function Events() {
  const liveEvents = await getUpcomingVtcEvents();
  return (
    <section
      id="events"
      className="w-full py-20 px-6 border-t border-white/5 bg-[#121418]/30"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <div className="w-[20%] h-[3px] bg-logistics-orange mx-auto rounded" />
          <h2 className="text-4xl sm:text-4xl font-black uppercase tracking-tight text-logistics-orange">
            Our Schedule
          </h2>
          <div className="w-[20%] h-[3px] bg-logistics-orange mx-auto rounded" />
        </div>

        {liveEvents.length === 0 ? (
          <div className="text-center bg-logistics-steel border border-white/5 rounded-2xl p-12 max-w-2xl mx-auto">
            <p className="text-sm text-logistics-gray-text">
              No upcoming convoys currently scheduled in the TruckersMP registry
              system.
            </p>
            <p className="text-xs text-logistics-gold mt-2 font-mono">
              Check back later or view our Discord manifest lane.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveEvents.map((event) => (
              <div
                key={event.id}
                className="bg-logistics-steel border border-white/5 rounded-2xl px-6 flex flex-col justify-between gap-6 shadow-xl hover:border-white/10 transition-colors group"
              >
                <div>
                  <h3 className=" min-h-15 text-lg font-black mt-4 text-logistics-orange font-mono leading-snug group-hover:text-logistics-gold transition-colors">
                    {event.title}
                  </h3>
                  <div className="relative w-full h-24 bg-logistics-dark">
                    <Image
                      src={event.bannerUrl}
                      alt=""
                      fill
                      className="object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-logistics-steel via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-row justify-between mt-4 space-y-1.5 text-xs text-logistics-gray-text">
                    <div className="flex items-center gap-2">
                      <span className="text-logistics-orange font-bold font-mono">
                        DEPART:
                      </span>
                      <span className="text-white font-medium font-mono">
                        {event.departure}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-logistics-gold font-bold font-mono">
                        ARRIVE:
                      </span>
                      <span className="text-white font-medium font-mono">
                        {event.arrival}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between text-xs">
                    <EventIcons icon={Gamepad2} label={event.game} />
                    <EventIcons icon={Server} label={event.server} />
                    <EventIcons
                      icon={UsersRound}
                      label={String(event.attending)}
                    />
                    <EventIcons
                      icon={Truck}
                      label={String(event.vtcAttending)}
                    />
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs mb-3">
                  <div className="font-mono text-logistics-gray-text">
                    📅{" "}
                    <span className="text-white font-semibold">
                      {event.date}
                    </span>{" "}
                    @{" "}
                    <span className="text-logistics-gold font-bold">
                      {event.time}
                    </span>
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center font-mono text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-logistics-orange text-white hover:text-white px-3.5 py-2 rounded-lg transition-all"
                  >
                    Attend
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
