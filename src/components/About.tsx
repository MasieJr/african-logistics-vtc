import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="w-full py-24 px-6 bg-gradient-to-b from-logistics-dark to-logistics-steel/20 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative w-full aspect-video border border-white/10 shadow-2xl rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-logistics-orange/5 mix-blend-color z-10" />
          <Image
            src="/hero-bg.jpg"
            alt="African Logistics Convoy Escort Operations"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-logistics-orange">
              Established Oct 2021
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white font-mono">
              About Us
            </h2>
          </div>
          <div className="w-12 h-[3px] bg-logistics-orange rounded" />

          <div className="space-y-4 text-logistics-gray-text text-sm leading-relaxed font-medium">
            <p>
              <strong className="text-white">African Logistics VTC</strong> is
              an English-speaking virtual trucking company hosting members from
              all corners of the African continent. Founded on{" "}
              <span className="text-logistics-gold font-semibold">
                01 October 2021
              </span>
              , this project was built from the ground up to bring an
              evolutionary shift to the global TruckersMP community.
            </p>

            <p>
              As the leading simulation logistics enterprise in the{" "}
              <strong className="text-white uppercase tracking-wider">
                SADC
              </strong>{" "}
              region, our network extends across deep continental logistics
              hubs—proudly featuring active rosters from{" "}
              <span className="text-white font-semibold">
                South Africa, Zimbabwe, Mozambique, Botswana, Malawi, Egypt, and
                Kenya
              </span>
              . Our primary focus is to cultivate a premier community unlike any
              other.
            </p>

            <p>
              We maintain an uncompromised commitment to providing our drivers
              with the absolute best experience in virtual transport. To ensure
              maximum accessibility, African Logistics coordinates a diverse
              schedule of convoys across both Euro Truck Simulator 2 and
              American Truck Simulator, safely balancing DLC and non-DLC terrain
              routes so every single driver on our team can participate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
