import React, {useState} from "react";

function Header () {
      const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>

    <header className="bg-[#C5F5D5] border-b-1 border-black">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <span className="text-black text-xl font-bold tracking-tight">
              KaizenFit
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-black font-medium hover:opacity-70 transition-opacity">
              HOME
            </a>
            <a href="#about" className="text-black font-medium hover:opacity-70 transition-opacity">
              ABOUT
            </a>
            <button className="bg-[#4ADE80] text-black font-medium px-6 py-2 rounded hover:bg-[#3BC66D] transition-colors">
              SIGN IN/REGISTER
            </button>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t-2 border-black pt-4">
            <nav className="flex flex-col gap-4">
              <a href="#home" className="text-black font-medium hover:opacity-70 transition-opacity">
                HOME
              </a>
              <a href="#about" className="text-black font-medium hover:opacity-70 transition-opacity">
                ABOUT
              </a>
              <button className="bg-[#4ADE80] text-black font-medium px-6 py-2 rounded hover:bg-[#3BC66D] transition-colors w-full">
                SIGN IN/REGISTER
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
        </>
    );
}

export default Header;