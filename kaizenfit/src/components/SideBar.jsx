import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function SideBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Define the links in an array for cleaner rendering
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Programs", path: "/programs" },
    { name: "Nutrition", path: "/nutrition" },
    { name: "Community", path: "/community" },
    { name: "Settings", path: "/settings" },
  ];

  // This function returns the class names for a link based on its 'active' state.
  // isActive is automatically provided by the NavLink component.
  const getLinkClass = ({ isActive }) => {
    const baseClass =
      "block py-4 px-6 font-mono font-heading uppercase text-lg text-white transition-all tracking-tight hover:bg-kaizen-lightgreen/20 m-2 text-center rounded ";
    
    // If active, it gets a white background and a black border.
    // If not, it has a transparent border to prevent layout shifts on hover.
    const activeClass = isActive
      ? "bg-kaizen-lightgreen/50"
      : "border-transparent";

    return `${baseClass} ${activeClass}`;
  };

  return (
    <aside className="h-screen w-72 bg-kaizen-green border-r-3 border-kaizen-black flex flex-col flex-shrink-0 sticky top-0">
      {/* Logo / Brand Area */}
      <div className="p-6 border-b-2 border-black bg-kaizen-mint flex items-center gap-3">
        {/* Simple placeholder for your logo icon */}
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-black rounded-full"></div>
          <div className="w-4 h-4 bg-black rounded-full"></div>
        </div>
        <h1 className="font-heading text-2xl uppercase text-black font-bebas">
          KaizenFit
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6">
        <ul>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={getLinkClass}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-6 border-t-2 border-kaizen-black bg-kaizen-green">
        {user && (
          <div className="mb-4 font-mono text-sm text-white font-bold">
            LOGGED IN AS: <br />
            <span className="truncate block">{user.email}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full bg-black text-white rounded font-heading uppercase py-4 text-lg hover:shadow-none transition-all hover:bg-white hover:text-black"
        >
          LOGOUT
        </button>
      </div>
    </aside>
  );
}