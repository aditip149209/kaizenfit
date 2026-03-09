import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. Import the hook
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

function Header() {
  const { user } = useAuth(); // 2. Grab the current user
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 3. Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-[#C5F5D5] border-b-1 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <span className="text-black text-xl font-bold tracking-tight font-heading">
              KaizenFit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
            <Link to="/" className="text-black font-bold hover:opacity-70 transition-opacity">
              HOME
            </Link>
            
            {/* CONDITIONAL RENDERING STARTS HERE */}
            {user ? (
              <>
                <Link to="/dashboard" className="text-black font-bold hover:opacity-70 transition-opacity">
                  DASHBOARD
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-black text-[#C5F5D5] font-bold px-6 py-2 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all shadow-neo"
                >
                  LOGOUT_
                </button>
              </>
            ) : (
              <>
                <Link to="/about" className="text-black font-bold hover:opacity-70 transition-opacity">
                  ABOUT
                </Link>
                <Link to="/login">
                  <button className="bg-[#4ADE80] text-black font-bold px-6 py-2 rounded hover:bg-[#3BC66D] hover:shadow-neo transition-all">
                    SIGN IN / REGISTER
                  </button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t-2 border-black pt-4">
            <nav className="flex flex-col gap-4 font-mono">
              <Link to="/" className="text-black font-medium hover:opacity-70">HOME</Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-black font-medium hover:opacity-70">DASHBOARD</Link>
                  <button onClick={handleLogout} className="text-left text-red-600 font-bold hover:opacity-70">
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link to="/about" className="text-black font-medium hover:opacity-70">ABOUT</Link>
                  <Link to="/login" className="bg-[#4ADE80] text-black font-medium px-6 py-2 rounded text-center shadow-neo">
                    SIGN IN / REGISTER
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;