export default function Recruit() {
  return (
    <section
      id="apply"
      className="w-full py-20 px-6 border-t border-white/5 bg-gradient-to-b from-logistics-dark to-black"
    >
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-logistics-orange">
            Recruitment Window Open
          </span>
          <h2 className="text-3xl font-black uppercase text-white mt-1">
            Join The Fleet
          </h2>
        </div>
        <form className="bg-logistics-steel border border-white/5 rounded-2xl p-6 space-y-4 shadow-2xl">
          <div>
            <label className="block text-xs text-logistics-gray-text uppercase font-bold mb-1">
              TruckersMP Handle
            </label>
            <input
              type="text"
              placeholder="e.g. AlphaTrucker"
              className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-logistics-orange"
            />
          </div>
          <div>
            <label className="block text-xs text-logistics-gray-text uppercase font-bold mb-1">
              Why do you want to join African Logistics?
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your driving history..."
              className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-logistics-orange"
            />
          </div>
          <button
            type="button"
            className="w-full bg-logistics-orange hover:bg-logistics-orange/90 text-white font-black py-3.5 rounded-xl transition-all uppercase tracking-wider text-xs"
          >
            Submit Roster Application
          </button>
        </form>
      </div>
    </section>
  );
}
