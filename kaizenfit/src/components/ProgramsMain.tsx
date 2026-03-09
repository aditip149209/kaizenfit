import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

// --- COMPONENTS ---

const PricingCard = ({ title, price, features, recommended = false, onSelect }: any) => (
  <div className={`relative border-3 border-black bg-white flex flex-col p-6 shadow-neo transition-all hover:-translate-y-2 ${recommended ? 'ring-4 ring-black/10' : ''}`}>
    
    {recommended && (
      <div className="absolute top-0 right-0 bg-black text-kaizen-green font-heading text-xs uppercase px-3 py-1 border-l-3 border-b-3 border-black">
        Recommended
      </div>
    )}

    <h3 className="font-heading text-2xl uppercase mb-2">{title}</h3>
    <div className="mb-6">
      <span className="font-heading text-4xl">Rs.{price}</span>
      <span className="font-mono text-gray-500">/MO</span>
    </div>

    <ul className="flex-1 space-y-4 mb-8 font-mono text-sm">
      {features.map((feat: string, i: number) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-black font-bold">✓</span>
          <span className="text-gray-600 uppercase">{feat}</span>
        </li>
      ))}
    </ul>

    <button 
      onClick={onSelect}
      className={`w-full py-4 font-heading uppercase text-sm border-3 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${recommended ? 'bg-kaizen-green text-black' : 'bg-black text-white hover:bg-white hover:text-black'}`}
    >
      Initialize Protocol
    </button>
  </div>
);

const ActivePlanCard = ({ plan }: { plan: any }) => (
  <div className="max-w-2xl mx-auto">
    {/* The "Physical Card" Look */}
    <div className="bg-kaizen-green border-3 border-black p-8 shadow-neo relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-32 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

      <div className="flex justify-between items-start mb-12 relative z-10">
        <div>
          <h2 className="font-heading text-4xl uppercase tracking-tighter mb-1">KAIZEN PASS // {plan.tier}</h2>
          <p className="font-mono text-xs font-bold tracking-widest opacity-60">ID: #882-991-OP</p>
        </div>
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center border-4 border-white/50">
           <span className="text-3xl">★</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 relative z-10 mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase mb-1 opacity-60">Status</p>
          <p className="font-heading text-xl uppercase bg-black text-white inline-block px-2">ACTIVE DUTY</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase mb-1 opacity-60">Valid Until</p>
          <p className="font-heading text-xl uppercase">DEC 31, 2025</p>
        </div>
      </div>

      <div className="border-t-3 border-black pt-6 relative z-10">
        <p className="font-heading text-sm uppercase mb-4">Clearance Level Access:</p>
        <div className="grid grid-cols-2 gap-2 font-mono text-xs font-bold">
           {plan.perks.map((perk: string) => (
             <div key={perk} className="flex items-center gap-2">
               <div className="w-2 h-2 bg-black"></div> {perk}
             </div>
           ))}
        </div>
      </div>
    </div>

    {/* Management Actions */}
    <div className="mt-8 grid grid-cols-2 gap-4">
      <button className="bg-white border-3 border-black py-4 font-heading uppercase text-sm hover:bg-gray-100">
        Download Invoice
      </button>
      <button className="bg-white text-red-600 border-3 border-black py-4 font-heading uppercase text-sm hover:bg-red-50">
        Cancel Subscription
      </button>
    </div>
  </div>
);

export default function Programs() {
  const { user } = useAuth();
  
  // --- MOCK STATE TO TOGGLE VIEW ---
  // Set this to TRUE to see the "Active Plan" view
  // Set this to FALSE to see the "Pricing Table" view
  const [hasSubscription, setHasSubscription] = useState(false); 

  const handleSubscribe = (tier: string) => {
    alert(`INITIATING PAYMENT GATEWAY FOR: ${tier}`);
    setHasSubscription(true); // Simulate successful sub
  };

  return (
    <div className="flex flex-col h-full w-full bg-kaizen-gray overflow-y-auto">
      
      {/* Header */}
      <header className="bg-white border-b-3 border-black p-6">
        <h1 className="font-heading text-3xl uppercase tracking-tighter">Training Protocols</h1>
        <p className="font-mono text-sm text-gray-600 mt-1 uppercase">
          Select your level of engagement
        </p>
      </header>

      <main className="flex-1 p-8 w-full">
        
        {hasSubscription ? (
          // VIEW 1: USER HAS A PLAN
          <ActivePlanCard 
            plan={{
              tier: "TACTICAL",
              perks: ["Unlimited AI Coaching", "Advanced Analytics", "Squad Access", "Custom Nutrition"]
            }} 
          />
        ) : (
          // VIEW 2: PRICING TABLE
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* TIER 1 */}
            <PricingCard 
              title="Operative" 
              price="0" 
              onSelect={() => handleSubscribe("OPERATIVE")}
              features={[
                "Access to Daily Mission",
                "Basic Progress Tracking",
                "Community Read-Only",
                "Ad-Supported Experience"
              ]} 
            />

            {/* TIER 2 (Highlight) */}
            <PricingCard 
              title="Tactical" 
              price="19" 
              recommended={true}
              onSelect={() => handleSubscribe("TACTICAL")}
              features={[
                "Full Protocol Library",
                "Advanced Biometrics",
                "Squad Leaderboards",
                "Nutrition Command Center",
                "Ad-Free Interface"
              ]} 
            />

            {/* TIER 3 */}
            <PricingCard 
              title="Elite" 
              price="49" 
              onSelect={() => handleSubscribe("ELITE")}
              features={[
                "1-on-1 Human Coaching",
                "Video Form Analysis",
                "Custom Meal Prep Delivery",
                "Priority Support Line",
                "Exclusive Gear Drops"
              ]} 
            />
          </div>
        )}
      </main>
    </div>
  );
}