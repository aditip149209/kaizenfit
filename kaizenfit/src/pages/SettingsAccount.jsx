import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import ChangePasswordModal from "./ChangePassword";
import ChangeFitnessGoal from "../components/ChangeFitnessGoal";
import ChangeFitnessLevel from "../components/ChangeFitnessLevel";
import { jwtDecode } from "jwt-decode";


export default function SettingsAccount() {
  const [activeNav, setActiveNav] = useState("Profile");
  const [btnHover, setBtnHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [showFitnessGoalModal, setShowFitnessGoalModal] = useState(false);
  const [showFitnessLevelModal, setShowFitnessLevelModal] = useState(false);
 
  const [contactDetails, setContactDetails] = useState(null);

  const navigate = useNavigate()

  const handleLogout = () => { 
    localStorage.removeItem('token');
    navigate('/');
  }

  // Settings nav links
  const navLinks = ["Profile", "Account", "Help"];

  // Handle password change submission

  const getUserDetails = async () => {
    try{
      const response = await axios.get(`http://localhost:3000/api/user/getuserdetails?UserID=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log("User details:", response.data);
      setUserDetails(response.data);   
    }
    catch(error){
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details");
    }
  }
 

  // Handle Contact Us button click
  const handleContactUs = () => {
    const randomContacts = [
      { name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
      { name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210" },
      { name: "Alice Johnson", email: "alice.johnson@example.com", phone: "555-123-4567" },
    ];
    const randomContact = randomContacts[Math.floor(Math.random() * randomContacts.length)];
    setContactDetails(randomContact);
    setShowContactModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
    if(userId){
      getUserDetails();
    }

  }, [userId, showFitnessLevelModal, showFitnessGoalModal]);


  return (
    <div className="flex min-h-screen bg-[#0b181a] font-inter text-[#e3f6fc]">
      {/* Sidebar */}
      <div className="bg-[#142626] w-[80px] flex flex-col items-center py-[30px] gap-[30px] rounded-tl-[20px] rounded-bl-[20px]">
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/dashboard')}>
          <img src="icons/KaizenLogo.png" alt="Logo" className="w-[22px] h-[22px] object-contain block" />
        </div>
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/dashboard')}>
          <img src="icons/home.png" alt="Home" className="w-[22px] h-[22px] object-contain block" />
        </div>

        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={() => navigate('/profilesettings')}>
          <img src="icons/settings.png" alt="Settings" className="w-[22px] h-[22px] object-contain block" />
        </div>
        <div className="w-[40px] h-[40px] bg-[#1d3434] rounded-[12px] mb-[10px] flex items-center justify-center transition-all" onClick={handleLogout}>
          <img src="icons/logout.png" alt="Logout" className="w-[22px] h-[22px] object-contain block" />
        </div>
      </div>

      {/* Main Panel */}
      <ToastContainer hideProgressBar={true} position="top-center"/>
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
        {activeNav === "Profile" && (
  <div className="bg-[#0e2324] rounded-xl p-9 max-w-xl w-full text-[#e3f6fc] shadow-md mt-2 flex flex-col">
    <div className="text-xl font-semibold mb-4">Profile</div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label htmlFor="firstName" className="text-sm text-[#b5d7e5] mb-1">First Name</label>
        <input
          id="firstName"
          type="text"
          value={userDetails?.FirstName || ""}
          readOnly
          className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="text-sm text-[#b5d7e5] mb-1">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={userDetails?.LastName || ""}
          readOnly
          className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
        />
      </div>
    </div>

    <label htmlFor="gender" className="text-sm text-[#b5d7e5] mb-1">Gender</label>
    <input
      id="gender"
      type="text"
      value={userDetails?.Gender || ""}
      readOnly
      className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
    />

    <label htmlFor="dob" className="text-sm text-[#b5d7e5] mb-1">Date of Birth</label>
    <input
      id="dob"
      type="text"
      value={userDetails?.DateOfBirth ? new Date(userDetails.DateOfBirth).toLocaleDateString("en-GB") : ""}
      readOnly
      className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
    />

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label htmlFor="height" className="text-sm text-[#b5d7e5] mb-1">Height</label>
        <input
          id="height"
          type="text"
          value={userDetails?.Height || ""}
          readOnly
          className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
        />
      </div>
      <div>
        <label htmlFor="weight" className="text-sm text-[#b5d7e5] mb-1">Weight</label>
        <input
          id="weight"
          type="text"
          value={userDetails?.WeightGoal || ""}
          readOnly
          className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
        />
      </div>
    </div>

    {/* 🔥 Fitness Level Field */}
    <div className="mb-4">
      <label htmlFor="fitnessLevel" className="text-sm text-[#b5d7e5] mb-1">Fitness Level</label>
      <div className="flex items-center gap-2">
        <input
          id="fitnessLevel"
          type="text"
          value={userDetails?.FitnessLevel || ""}
          readOnly
          className="flex-1 bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
        />
        <button
          onClick={() => setShowFitnessLevelModal(true)}
          className="px-3 py-2 text-sm bg-[#244043] rounded-lg hover:bg-[#30565c] text-[#e3f6fc]"
        >
          Change Level
        </button>
        {showFitnessLevelModal && (
  <ChangeFitnessLevel onClose={() => setShowFitnessLevelModal(false)} />
)}
      </div>
    </div>

    {/* 🔥 Fitness Goal Field */}
    <div className="mb-4">
      <label htmlFor="fitnessGoal" className="text-sm text-[#b5d7e5] mb-1">Fitness Goal</label>
      <div className="flex items-center gap-2">
        <input
          id="fitnessGoal"
          type="text"
          value={userDetails?.FitnessGoal || ""}
          readOnly
          className="flex-1 bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
        />
        <button
    onClick={() => setShowFitnessGoalModal(true)}
    className="px-3 py-2 text-sm bg-[#244043] rounded-lg hover:bg-[#30565c] text-[#e3f6fc] shadow-sm"
  >
    Change Goal
  </button>

{showFitnessGoalModal && (
  <ChangeFitnessGoal onClose={() => setShowFitnessGoalModal(false)} />
)}
      </div>
    </div>
  </div>
)}


          {/* Help Section */}
          {activeNav === "Help" && (
            <div className="bg-[#0e2324] rounded-xl p-9 max-w-xl w-full text-[#e3f6fc] shadow-md mt-2 flex flex-col">
              <div className="text-xl font-semibold mb-4">Help</div>

              <button
                className="bg-[#2ec4b6] text-white p-3 rounded-lg text-lg font-semibold mb-4"
                onClick={handleContactUs}
              >
                Contact Us
              </button>

              <button
                className="bg-red-500 text-white p-3 rounded-lg text-lg font-semibold mt-4"
                onClick={() => alert("Delete Account clicked")}
              >
                Delete Account
              </button>
            </div>
          )}

          {/* Contact Us Modal */}
          {showContactModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#0e2324] rounded-xl p-6 w-[400px] text-[#e3f6fc] shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
                {contactDetails && (
                  <div className="mb-4">
                    <p><strong>Name:</strong> {contactDetails.name}</p>
                    <p><strong>Email:</strong> {contactDetails.email}</p>
                    <p><strong>Phone:</strong> {contactDetails.phone}</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    className="bg-[#2ec4b6] text-white p-2 rounded-lg text-sm font-semibold"
                    onClick={() => setShowContactModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Account Section */}
          {activeNav === "Account" && (
            <div className="bg-[#0e2324] rounded-xl p-9 max-w-xl w-full text-[#e3f6fc] shadow-md mt-2 flex flex-col">
              <div className="text-xl font-semibold mb-4">Account</div>

              <label htmlFor="email" className="text-sm text-[#b5d7e5] mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={userDetails?.Email || ""}
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
              <button className="mt-4 bg-[#1e5a5a] text-white py-2 px-4 rounded-full hover:bg-[#3f8b8b] transition-colors"
               onClick={() => setShowChangePasswordModal(true)}>Change Password</button>
             {showChangePasswordModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
            </div>
          )}
              </div>
            </div>
          )}         
        </div>
      </div>
    </div>
  );
}
