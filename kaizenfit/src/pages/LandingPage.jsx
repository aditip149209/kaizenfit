import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const LandingPage = () => {
    return(
        <>
        <div className="w-[1920px] h-[1080px] relative">
  <div className="w-[1920px] h-[1080px] left-0 top-0 absolute bg-gradient-to-l from-slate-900 to-neutral-900" />
  <div className="w-[1920px] h-36 left-0 top-0 absolute bg-blue-300/0" />
  <img className="w-[1119px] h-[1080px] left-[801px] top-0 absolute opacity-30" src='kaizenfit/public/man-4648086_1920.jpg' />
  <div className="w-60 h-12 left-[1598px] top-[74px] absolute text-center justify-start text-white text-xl font-medium font-['Inter']">CONTACT<br/></div>
  <div className="w-60 h-12 left-[1409px] top-[74px] absolute text-center justify-start text-white text-xl font-medium font-['Inter']">ABOUT</div>
  <div className="w-60 h-12 left-[1233px] top-[74px] absolute text-center justify-start text-white text-xl font-medium font-['Inter']">HOME</div>
  <div className="w-60 h-12 left-[126px] top-[72px] absolute text-center justify-start text-white text-3xl font-bold font-['Inter']">KAIZENFIT</div>
  <div className="w-40 h-16 left-[157px] top-[628px] absolute bg-teal-400 rounded-[33.50px]" />
  <div className="w-36 h-5 left-[170px] top-[651px] absolute text-center justify-start text-black text-2xl font-bold font-['Inter']">SIGN IN</div>
  <div className="w-40 h-16 left-[334px] top-[628px] absolute bg-teal-400 rounded-[33.50px]" />
  <div className="w-48 h-14 left-[321px] top-[651px] absolute text-center justify-start text-black text-2xl font-bold font-['Inter']">REGISTER</div>
  <div className="w-96 h-44 left-[154px] top-[300px] absolute justify-start text-white text-5xl font-bold font-['Inter']">OPTIMIZE EVERY MOVE WITH DATA DRIVEN INSIGHTS</div>
  <div className="w-96 h-12 left-[126px] top-[562px] absolute text-center justify-start text-white text-2xl font-thin font-['Inter']">Your Smartest Workout Companion</div>
</div>

        </>
    )
}

