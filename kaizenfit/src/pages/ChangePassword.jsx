import React, { useState } from "react";

export default function ChangePasswordModal({ onClose }) {
  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [saveHover, setSaveHover] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    alert("Password change submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start font-sans">
      <div className="bg-teal-950 text-teal-100 w-[340px] mt-16 p-7 rounded-xl shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-xl text-teal-100 hover:text-red-400 transition"
          onClick={onClose || (() => alert("Close clicked!"))}
          title="Close"
        >
          &times;
        </button>

        <h2 className="text-center text-lg font-medium tracking-wide mb-7">
          CHANGE PASSWORD
        </h2>

        <form onSubmit={handleSubmit}>
          {["current", "new", "confirm"].map((field, index) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-sm text-teal-300 mb-1 capitalize"
              >
                {field === "confirm" ? "Confirm Password:" : `${field.charAt(0).toUpperCase() + field.slice(1)} Password:`}
              </label>
              <input
                type="password"
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-transparent border border-teal-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                autoComplete={
                  field === "current" ? "current-password" : "new-password"
                }
              />
            </div>
          ))}

          <button
            type="submit"
            className={`block mx-auto mt-6 px-7 py-2 rounded-full text-white font-medium transition-colors ${
              saveHover ? "bg-teal-700" : "bg-teal-600"
            }`}
            onMouseEnter={() => setSaveHover(true)}
            onMouseLeave={() => setSaveHover(false)}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
