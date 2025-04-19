import React, { useState } from "react";

export default function SettingsAccount() {
  const [activeNav, setActiveNav] = useState("Account");
  const [btnHover, setBtnHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);

  // Sidebar icons data
  const sidebarIcons = [
    { href: "#", src: "icons/KaizenLogo.png", alt: "Logo", isLogo: true },
    { href: "#", src: "icons/home.png", alt: "Home" },
    { href: "#", src: "icons/stats.png", alt: "Analytics" },
    { href: "#", src: "icons/meal.png", alt: "Billing" },
    { href: "#", src: "icons/settings.png", alt: "Settings" },
    { href: "#", src: "icons/logout.png", alt: "Logout", bottom: true },
  ];

  // Settings nav links
  const navLinks = ["Profile", "Account",  "Help"];

  return (
    <div className="flex min-h-screen bg-[#0b181a] font-inter text-[#e3f6fc]">
      {/* Sidebar */}
      <div className="w-24 bg-[#162224] flex flex-col items-center py-8 gap-4 rounded-l-2xl">
        {sidebarIcons.map(({ href, src, alt, isLogo, active, bottom }, i) => (
          <a
            key={i}
            href={href}
            className={`${
              active ? "bg-[#2ec4b6]" : "bg-[#223036]"
            } w-12 h-12 mb-3 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200`}
            style={bottom ? { marginTop: "auto", marginBottom: "10px" } : {}}
          >
            <img
              src={src}
              alt={alt}
              className={`w-7 h-7 transition-all duration-200 ${
                active ? "filter-none" : "filter brightness-0 invert grayscale opacity-85"
              }`}
            />
          </a>
        ))}
      </div>

      {/* Main Panel */}
      <div className="flex-1 bg-[#112224] rounded-r-2xl p-12 min-w-0 flex flex-row min-h-screen">
        <nav className="w-44 pl-10 flex flex-col gap-6">
          <div className="text-xl font-semibold text-[#e3f6fc] mb-6">Settings</div>
          {navLinks.map((link) => (
            <button
              key={link}
              className={`${
                activeNav === link ? "bg-[#2ec4b6] text-white font-semibold" : "bg-transparent text-[#b5d7e5]"
              } p-2.5 rounded-lg text-lg text-left cursor-pointer transition-all duration-200`}
              onClick={() => setActiveNav(link)}
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="flex-1 flex items-start justify-start pl-14">
          {activeNav === "Account" && (
            <div className="bg-[#0e2324] rounded-xl p-9 max-w-xl w-full text-[#e3f6fc] shadow-md mt-2 flex flex-col">
              <div className="text-xl font-semibold mb-4">Account</div>

              <label htmlFor="email" className="text-sm text-[#b5d7e5] mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value="jagjeet@magical.com"
                readOnly
                className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
              />

              <label htmlFor="password" className="text-sm text-[#b5d7e5] mb-1">
                Password
              </label>
              <div className="flex items-center gap-4 mb-6">
                <input
                  id="password"
                  type="password"
                  value="********"
                  readOnly
                  className="w-44 bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
                />
                <button
                  className={`${
                    btnHover ? "bg-[#22b5a5]" : "bg-[#2ec4b6]"
                  } text-white p-2 rounded-lg text-sm font-semibold`}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  onClick={() => alert("Change password clicked")}
                >
                  Change Password
                </button>
              </div>

              <button
                className={`${
                  saveHover ? "bg-[#22b5a5]" : "bg-[#2ec4b6]"
                } text-white p-3 rounded-lg text-lg font-semibold mt-4`}
                onMouseEnter={() => setSaveHover(true)}
                onMouseLeave={() => setSaveHover(false)}
                onClick={() => alert("Save clicked")}
              >
                Save
              </button>
            </div>
          )}


          {activeNav === "Profile" && (
            <div className="bg-[#0e2324] rounded-xl p-9 max-w-xl w-full text-[#e3f6fc] shadow-md mt-2 flex flex-col">
              <div className="text-xl font-semibold mb-4">Account</div>

              <label htmlFor="email" className="text-sm text-[#b5d7e5] mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value="jagjeet@magical.com"
                readOnly
                className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
              />

              <label htmlFor="password" className="text-sm text-[#b5d7e5] mb-1">
                Password
              </label>
              <div className="flex items-center gap-4 mb-6">
                <input
                  id="password"
                  type="password"
                  value="********"
                  readOnly
                  className="w-44 bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
                />
                <button
                  className={`${
                    btnHover ? "bg-[#22b5a5]" : "bg-[#2ec4b6]"
                  } text-white p-2 rounded-lg text-sm font-semibold`}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  onClick={() => alert("Change password clicked")}
                >
                  Change Password
                </button>
              </div>

              <button
                className={`${
                  saveHover ? "bg-[#22b5a5]" : "bg-[#2ec4b6]"
                } text-white p-3 rounded-lg text-lg font-semibold mt-4`}
                onMouseEnter={() => setSaveHover(true)}
                onMouseLeave={() => setSaveHover(false)}
                onClick={() => alert("Save clicked")}
              >
                Save
              </button>
            </div>
          )}
          


          {activeNav === "Help" && (
            <div className="bg-[#0e2324] rounded-xl p-9 max-w-xl w-full text-[#e3f6fc] shadow-md mt-2 flex flex-col">
              <div className="text-xl font-semibold mb-4">Account</div>

              <label htmlFor="email" className="text-sm text-[#b5d7e5] mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value="jagjeet@magical.com"
                readOnly
                className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
              />

              <label htmlFor="password" className="text-sm text-[#b5d7e5] mb-1">
                Password
              </label>
              <div className="flex items-center gap-4 mb-6">
                <input
                  id="password"
                  type="password"
                  value="********"
                  readOnly
                  className="w-44 bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
                />
                
              </div>

              <button
                className={`${
                  saveHover ? "bg-[#22b5a5]" : "bg-[#2ec4b6]"
                } text-white p-3 rounded-lg text-lg font-semibold mt-4`}
                onMouseEnter={() => setSaveHover(true)}
                onMouseLeave={() => setSaveHover(false)}
                onClick={() => alert("Save clicked")}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
