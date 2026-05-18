"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobLogForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      departureCity: formData.get("departureCity"),
      arrivalCity: formData.get("arrivalCity"),
      cargo: formData.get("cargo"),
      distanceKm: parseInt(formData.get("distanceKm") as string),
      fuelUsedLiters: parseFloat(formData.get("fuelUsedLiters") as string),
      income: parseFloat(formData.get("income") as string),
      screenshotUrl:
        formData.get("screenshotUrl") ||
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7", 
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error("Failed to file job delivery configuration logs");

      setMessage({
        type: "success",
        text: "Job logged successfully and waiting for dispatcher approval!",
      });
      e.currentTarget.reset();
      router.refresh(); /
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to submit data telemetry packet.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold border ${
            message.type === "success"
              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
              : "bg-logistics-orange/5 border-logistics-orange/20 text-logistics-orange"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label className="block text-xs text-logistics-gray-text mb-1 font-medium">
          Departure Hub Location
        </label>
        <input
          type="text"
          name="departureCity"
          required
          placeholder="e.g. Johannesburg (South Africa)"
          className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-logistics-gold"
        />
      </div>

      <div>
        <label className="block text-xs text-logistics-gray-text mb-1 font-medium">
          Arrival Hub Destination
        </label>
        <input
          type="text"
          name="arrivalCity"
          required
          placeholder="e.g. Lusaka (Zambia)"
          className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-logistics-gold"
        />
      </div>

      <div>
        <label className="block text-xs text-logistics-gray-text mb-1 font-medium">
          Cargo Weight / Type
        </label>
        <input
          type="text"
          name="cargo"
          required
          placeholder="e.g. Industrial Transformer (24t)"
          className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-logistics-gold"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-logistics-gray-text mb-1 font-medium">
            Distance (KM)
          </label>
          <input
            type="number"
            name="distanceKm"
            required
            placeholder="1200"
            className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-logistics-gold font-mono"
          />
        </div>
        <div>
          <label className="block text-xs text-logistics-gray-text mb-1 font-medium">
            Fuel Used (Liters)
          </label>
          <input
            type="number"
            step="0.1"
            name="fuelUsedLiters"
            required
            placeholder="480.5"
            className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-logistics-gold font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-logistics-gray-text mb-1 font-medium">
          Revenue Earned (ZAR)
        </label>
        <input
          type="number"
          step="0.01"
          name="income"
          required
          placeholder="14500"
          className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-logistics-gold font-mono"
        />
      </div>

      <div>
        <label className="block text-xs text-logistics-gray-text mb-1 font-medium">
          Telemetry Screenshot Link
        </label>
        <input
          type="url"
          name="screenshotUrl"
          placeholder="https://imgur.com/your-proof"
          className="w-full bg-logistics-dark border border-white/5 rounded-xl p-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-logistics-gold text-xs"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-logistics-gold hover:bg-logistics-gold/90 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-40 font-semibold mt-2"
      >
        {loading ? "Transmitting Data Telemetry..." : "Transmit Log Entry"}
      </button>
    </form>
  );
}
