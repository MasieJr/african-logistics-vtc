"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Trigger NextAuth credentials sign-in mechanism
      const result = await signIn("credentials", {
        redirect: false, // Don't reload the page automatically, let us handle navigation
        email,
        password,
      });

      if (result?.error) {
        // NextAuth passes the error string thrown in our authorize callback
        setError("Invalid email address or fleet access key.");
        setLoading(false);
      } else {
        // On successful authentication, redirect straight to the driver hub dashboard
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-logistics-dark flex flex-col items-center justify-center p-6 selection:bg-logistics-gold selection:text-black">
      <div className="w-full max-w-md bg-logistics-steel border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative subtle background line matching branding */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-logistics-gold to-logistics-orange" />

        {/* Header Block */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-xl font-black tracking-wider text-white hover:text-logistics-gold transition-colors"
          >
            AFRICAN LOGISTICS<span className="text-logistics-gold">.</span>
          </Link>
          <h2 className="mt-3 text-2xl font-bold text-white tracking-tight">
            Driver Portal Access
          </h2>
          <p className="text-xs text-logistics-gray-text mt-1">
            Enter your assigned VTC fleet credentials
          </p>
        </div>

        {/* Dynamic Security Alert Box */}
        {error && (
          <div className="mb-6 p-4 bg-logistics-orange/10 border border-logistics-orange/30 text-logistics-orange rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-logistics-gray-text mb-2">
              Company Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="driver@africanlogistics.com"
              className="w-full bg-logistics-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-logistics-gold transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-logistics-gray-text mb-2">
              Fleet Security Key
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-logistics-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-logistics-gold transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-logistics-orange hover:bg-logistics-orange/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-logistics-orange/15 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
          >
            {loading ? "Establishing Terminal Connection..." : "Secure Login"}
          </button>
        </form>

        {/* Informational Notice */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-logistics-gray-text">
            Not part of the logistics fleet yet?{" "}
            <Link
              href="/#apply"
              className="text-logistics-gold hover:underline font-medium"
            >
              Submit your application
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
