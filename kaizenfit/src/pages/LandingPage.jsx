import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const LandingPage = () => {

  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate('/login');
  }
  const onClickRegister = () => {
    navigate('/register');
  }


    return(
        <>
        <div className="relative w-full h-screen">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-l from-slate-900 to-neutral-900" />
  
  {/* Header Section */}
  <div className="absolute top-0 left-0 w-full h-36 bg-blue-300/0 flex items-center justify-center gap-10 px-8">
  {/* Logo */}
  <div className="absolute left-8 text-white text-3xl font-bold font-['Inter']">
    KAIZENFIT
  </div>
    <div className="text-white text-xl font-medium font-['Inter']"><Link to={'/'} >HOME</Link></div>
    <div className="text-white text-xl font-medium font-['Inter']"><Link to={'/about'}>ABOUT</Link></div>
    <div className="text-white text-xl font-medium font-['Inter']"><Link to={'/contact'}>CONTACT</Link></div>
  </div>
  
  {/* Image */}
  <img
    className="absolute inset-0 w-full h-full object-cover opacity-30"
    src="man-4648086_1920.jpg"
    alt="Background"
  />

  {/* Main Content */}
  <div className="absolute top-[300px] left-0 w-full text-center text-white">
    <h1 className="text-5xl font-bold font-['Inter']">OPTIMIZE EVERY MOVE WITH DATA DRIVEN INSIGHTS</h1>
    <p className="mt-4 text-2xl font-thin font-['Inter']">Your Smartest Workout Companion</p>
    {/* Sign In and Register Buttons */}
  <div className="absolute mt-8 w-full flex justify-center gap-4">
    <div className="w-40 h-16 bg-teal-400 rounded-[33.50px] flex items-center justify-center">
      <span className="text-black text-2xl font-bold font-['Inter']"><button onClick={onClickLogin}>SIGN IN</button></span>
    </div>
    <div className="w-40 h-16 bg-teal-400 rounded-[33.50px] flex items-center justify-center">
      <span className="text-black text-2xl font-bold font-['Inter']"><button onClick={onClickRegister}>REGISTER</button></span>
    </div>
  </div>
  </div> 

</div>
        </>
    )
}

