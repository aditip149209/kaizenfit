import { useState } from "react";

function Section1 () {
    return(
        <>
        <div className="bg-[#C5F5D5] min-h-screen">
      {/* Hero Banner */}
      <div className="border-b-1 border-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black font-bold font-bebas leading-tight">
            TRAIN HARD. <span className="text-[#4ADE80]">LIVE BETTER</span>
          </h1>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 border-b-1 border-black">
        {/* Top Left - Box Jump Image */}
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] border-b-1 md:border-b-0 md:border-r-1 border-black">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop" 
            alt="Athletes doing box jumps"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right - For The Committed */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bebas font-black mb-6">
            FOR THE<br />COMMITTED
          </h2>
          <p className="text-base md:text-xl mb-8 leading-relaxed">
            Train like an athlete with top-tier equipment and expert programming. Whether you're building muscle or breaking PRs, we help you push past limits.
          </p>
          <button className="self-start text-sm font-bold tracking-wider bg-[#4ADE80] m-3 p-3 rounded hover:bg-[#3BC66D] transition-colors">
            ABOUT US
          </button>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid md:grid-cols-3 border-b-1 border-black align-middle">
        {/* Guided by Experts */}
        <div className="p-8 md:p-12 lg:p-16 border-b-1 md:border-b-0 md:border-r-1 border-black">
          <h2 className="text-3xl md:text-4xl font-black font-bebas mb-6">
            GUIDED BY<br />EXPERTS
          </h2>
          <p className="text-base md:text-xl leading-relaxed">
            We believe in creating a positive environment where you can thrive. We're here to help you achieve your goals and unlock your full potential.
          </p>
        </div>

        {/* Dynamic Open Gym */}
        <div className="p-8 md:p-12 lg:p-16">
          <h2 className="text-3xl md:text-4xl font-black font-bebas mb-6">
            DYNAMIC<br />OPEN GYM
          </h2>
          <p className="text-base md:text-xl leading-relaxed">
            Our facility is the optimal environment for strength training and performance, fully equipped with top-of-the-line tools, ample training areas, and a focus on functional movement.
          </p>
        </div>


        <div className="hidden md:block relative h-full border-b-1 border-black">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop" 
              alt="Person working out"
              className="w-full h-full object-cover"
            />
        </div>

      </div>

      {/* Third Row */}
      <div className="grid md:grid-cols-[4fr_3fr]">
        {/* Join The Community Section */}
        <div className="border-b-1 md:border-b-0 md:border-r-1 border-black flex flex-col">
          {/* Join The Community */}
          <div className="p-5 md:p-8 lg:p-10 border-b-1 border-black">
            <h2 className="text-5xl md:text-9xl font-black font-bebas">
              JOIN THE <span className="text-[#4ADE80]">COMMUNITY</span>
            </h2>
          </div>

          {/* Features List */}
          <div className="flex flex-col flex-1 justify-between">
            <div className="p-5 md:p-8 lg:p-10 border-b-1 border-black">
              <h3 className="text-3xl md:text-6xl font-bebas font-black">
                DISCOVER YOUR<br />POTENTIAL
              </h3>
            </div>

            <div className="p-5 md:p-8 lg:p-10 border-b-1 border-black">
              <h3 className="text-2xl md:text-4xl font-black font-bebas">
                EXPERT COACHING
              </h3>
              <p className="text-lg md:text-base">
                Trainers who are passionate about your progress.
              </p>
            </div>

            <div className="p-5 md:p-8 lg:p-10 border-b-1 border-black">
              <h3 className="text-2xl md:text-4xl font-black font-bebas">
                RESULTS-DRIVEN PROGRAMS
              </h3>
              <p className="text-lg md:text-base">
                Workouts that deliver tangible, measurable results.
              </p>
            </div>

            <div className="p-5 md:p-8 lg:p-10 border-b-1 border-black">
              <h3 className="text-2xl md:text-4xl font-black font-bebas">
                A SUPPORTIVE TRIBE
              </h3>
              <p className="text-lg md:text-base">
                A community that pushes you to be your best.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Images */}
        <div>         

          {/* Mobile: Woman with dumbbells */}
          <div className="md:hidden relative aspect-[4/3] border-b-1 border-black">
            <img 
              src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&auto=format&fit=crop" 
              alt="Woman with dumbbells"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Woman with dumbbells (Desktop) */}
          <div className="hidden md:block relative h-full">
            <img 
              src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&auto=format&fit=crop" 
              alt="Woman with dumbbells"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>


        </>
    );
};

export default Section1;