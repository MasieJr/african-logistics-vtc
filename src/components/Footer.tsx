export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-xs text-logistics-gray-text border-t border-white/5 bg-black">
      &copy; {new Date().getFullYear()} African Logistics VTC. Powered by
      Next.js & TruckersMP API.
    </footer>
  );
}
