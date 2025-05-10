import React from 'react'

function LogWater() {
  return (
    <>
    <div>
  {/* Small Square Icon */}
  <div className="w-4 h-4 relative">
    <div className="w-4 h-4 absolute overflow-hidden">
      <div className="w-4 h-4 absolute left-[0.16px] top-[0.16px] bg-slate-400" />
    </div>
  </div>

  {/* Water Tracker Card */}
  <div className="w-96 h-80 relative">
    {/* Card Background */}
    <div className="absolute w-96 h-80 bg-emerald-950 rounded-[30px]" />

    {/* Top Title */}
    <div className="absolute left-[31px] top-[35px] text-slate-400 text-xl font-normal font-['Inter']">
      WATER TRACKER
    </div>

    {/* Glass Count */}
    <div className="absolute left-[142px] top-[116px] w-40 h-7 text-center text-white text-3xl font-normal font-['Inter']">
      6 glasses
    </div>

    {/* Circular Buttons */}
    <div className="absolute left-[103px] top-[117px] w-8 h-8 bg-teal-900 rounded-full border border-white/0" />
    <div className="absolute left-[309px] top-[117px] w-8 h-8 bg-teal-900 rounded-full border border-white/0" />

    {/* Progress Bar */}
    <div className="absolute left-[84px] top-[167px] w-72 h-5 overflow-hidden">
      <div className="absolute w-72 h-5 bg-teal-900" />
      <div className="absolute w-56 h-5 bg-teal-500" />
    </div>

    {/* Small Line */}
    <div className="absolute left-[111px] top-[131px] w-4 h-[2.41px] bg-slate-400" />

    {/* Goal Text */}
    <div className="absolute left-[37px] top-[210px] w-28 h-4 text-slate-400 text-base font-medium font-['Inter']">
      Goal: 8 Glasses
    </div>

    {/* Edit Goal */}
    <div className="absolute left-[164px] top-[263px] w-28 h-4 text-center text-sky-200 text-base font-medium font-['Inter']">
      Edit Goal
    </div>

    {/* Edit Button */}
    <div className="absolute left-[127px] top-[248px] w-48 h-12 bg-teal-900 rounded-[58px] border border-white/0" />
  </div>
</div>
    </>  
  )
}

export default LogWater
