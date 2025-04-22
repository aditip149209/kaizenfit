import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePasswordModal({ onClose }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userID, setUserID] = useState(null);
  const [saveHover, setSaveHover] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserID(decoded.id);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = form;
    console.log("Form data:", form);

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    try {
      console.log("User ID:", userID);
      console.log("Current Password:", currentPassword);
      console.log("New Password:", newPassword);
      console.log("Confirm Password:", confirmPassword);
      const response = await axios.post(
        "http://localhost:3000/api/user/changepassword",
        {
          userId: userID,
          updatedData: {
            currentPassword: currentPassword,
            newPassword: newPassword,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Password changed");
      onClose(); // Optionally close modal on success
    } catch (err) {
      console.error("Error changing password", err);
      toast.error("Error changing password. Please try again.");
    }
  };

  return (
    <div>

      <ToastContainer
        position="bottom"
        autoClose={3000}
        hideProgressBar={true}/>
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
          {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-sm text-teal-300 mb-1 capitalize"
              >
                {field === "confirmPassword"
                  ? "Confirm Password:"
                  : `${field.replace("Password", "")} Password:`}
              </label>
              <input
                type="password"
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-transparent border border-teal-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                autoComplete={
                  field === "currentPassword" ? "current-password" : "new-password"
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
