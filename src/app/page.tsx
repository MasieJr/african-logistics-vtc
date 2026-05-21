import React from "react";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Staff from "@/components/Staff";
import Partners from "@/components/Partners";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <div className="min-h-screen bg-logistics-dark text-white selection:bg-logistics-gold selection:text-black">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Events />
      <Staff />
      <Partners />
      <Gallery />
      {/* <Recruit /> */}
      <Footer />
    </div>
  );
}
