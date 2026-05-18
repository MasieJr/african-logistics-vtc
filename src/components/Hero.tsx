import Link from "next/link";

export default function Hero() {
  return (
    <header
      className="relative w-full h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-cover bg-center border-b border-white/5"
      style={{
        backgroundImage: `linear-gradient(rgba(18, 18, 20, 0.6), rgba(18, 18, 20, 0.9)), url('/hero-bg.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,95,43,0.1),transparent_60%)]" />
      <div className="relative z-10 max-w-4xl space-y-2">
        <h2 className="text-logistics-gold text-2xl sm:text-3xl font-light italic tracking-wide font-serif">
          Welcome To
        </h2>
        <h1 className="text-white text-5xl sm:text-7xl font-black tracking-wider uppercase drop-shadow-md">
          African Logistics
        </h1>
        <p className="text-logistics-gray-text text-md sm:text-xl font-medium italic tracking-widest uppercase opacity-90 pt-1">
          Driven By Passion
        </p>
        <div className="pt-6">
          <Link
            href="/apply"
            className="bg-logistics-orange hover:bg-logistics-orange/90 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-logistics-orange/20 text-sm uppercase tracking-wider"
          >
            Join Our Fleet
          </Link>
        </div>
      </div>
    </header>
  );
}
