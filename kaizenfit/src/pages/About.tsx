import React from "react";
import { Link } from "react-router-dom"; // Assuming you use React Router

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      
      {/* 1. HEADER SECTION */}
      <header className="bg-[#C5F5D5] border-b border-black p-8 md:p-16">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-bebas uppercase leading-none tracking-tighter">
          ABOUT US
        </h1>
      </header>

      <main>
        {/* 2. VISION SECTION (Grid: Left Text, Right Image) */}
        <section className="grid grid-cols-1 md:grid-cols-2 border-b border-black bg-[#C5F5D5]">
          {/* Text Content */}
          <div className="p-8 md:p-16 flex flex-col justify-center border-b border-black md:border-b-0 md:border-r border-black">
            <h2 className="text-4xl md:text-6xl font-black font-bebas uppercase mb-6 leading-tight">
              TAP INTO YOUR <br/>
              <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">PRIMAL POWER.</span><br/>
              FORGE A STRONGER YOU.
            </h2>
            <h3 className="text-xl font-bebas font-bold uppercase mb-2 tracking-widest">OUR VISION</h3>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              KaizenFit is committed to delivering a training experience rooted in raw strength, functional fitness, and unwavering community support. We empower our members to tap into their primal power, achieve their goals, and live a life of strength, resilience, and unwavering determination.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-96 md:h-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop" 
              alt="Trainer assisting with barbell"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </section>

        {/* 3. FACILITY SECTION (Grid: Left Image, Right Text) */}
        <section className="grid grid-cols-1 md:grid-cols-2 border-b border-black bg-white">
          {/* Image (Order 2 on Mobile, Order 1 on Desktop) */}
          <div className="relative h-96 md:h-auto border-b border-black md:border-b-0 md:border-r border-black order-2 md:order-1 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800&auto=format&fit=crop" 
              alt="Person performing a deadlift"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Text Content (Order 1 on Mobile, Order 2 on Desktop) */}
          <div className="p-8 md:p-16 flex flex-col justify-center order-1 md:order-2">
            <h2 className="text-4xl md:text-6xl font-black font-bebas uppercase mb-6 leading-tight">
              DYNAMIC OPEN <br/> GYM
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              At KaizenFit, we strip away the fluff and focus on the fundamentals. Our expert coaches guide you through intense, functional workouts designed to build raw strength, resilience, and a body capable of anything. We provide the tools; you provide the sweat.
            </p>
          </div>
        </section>

        {/* 4. ATMOSPHERE BANNER (Full Width Image) */}
        <section className="relative h-[60vh] border-b border-black overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1200&auto=format&fit=crop" 
            alt="Gym Atmosphere"
            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-8 md:p-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-bebas uppercase text-white leading-tight max-w-4xl drop-shadow-md">
              WE'VE CREATED A SPACE WHERE YOU CAN RECONNECT WITH YOUR PRIMAL SELF.
            </h2>
          </div>
        </section>

        {/* 5. CALL TO ACTION */}
        <section className="bg-[#C5F5D5] border-b border-black p-16 md:p-24 text-center flex flex-col items-center justify-center">
          <p className="font-bold tracking-[0.2em] uppercase mb-4 text-sm">WHAT WE BELIEVE IN</p>
          <h2 className="text-5xl md:text-7xl font-black font-bebas uppercase mb-10 leading-none">
            JOIN THE TRIBE TODAY!
          </h2>
          <button className="bg-black text-white px-12 py-6 text-xl font-bebas font-bold uppercase tracking-wider border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            START YOUR JOURNEY
          </button>
        </section>
      </main>

      {/* 6. FOOTER (Simple Layout) */}
      <footer className="bg-black text-[#C5F5D5] p-8 md:p-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Brand */}
          <div>
             <h2 className="text-5xl font-black font-bebas uppercase tracking-tighter mb-2">KaizenFit</h2>
             <p className="opacity-80 max-w-xs">Forging elite fitness through discipline and continuous improvement.</p>
          </div>
          
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-bold uppercase tracking-wider">
            <div>
              <h3 className="text-white mb-4 border-b border-white/20 pb-2">CONTACT</h3>
              <p>hello@kaizenfit.com</p>
              <p>(555) 999-0000</p>
            </div>
            <div>
              <h3 className="text-white mb-4 border-b border-white/20 pb-2">HOURS</h3>
              <p>MON - FRI: 5:00 - 23:00</p>
              <p>SAT - SUN: 7:00 - 20:00</p>
            </div>
            <div>
              <h3 className="text-white mb-4 border-b border-white/20 pb-2">SOCIAL</h3>
              <p className="hover:text-white cursor-pointer">Instagram</p>
              <p className="hover:text-white cursor-pointer">Twitter</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;