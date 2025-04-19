import React, { useState } from "react";

export default function SettingsAccount() {
  const [activeNav, setActiveNav] = useState("Account");
  const [btnHover, setBtnHover] = useState(false);
  const [saveHover, setSaveHover] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [contactDetails, setContactDetails] = useState(null);

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
  const navLinks = ["Profile", "Account", "Help"];

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password change submission
  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    // Add logic to handle password change (e.g., API call)
    alert("Password changed successfully!");
    setShowChangePasswordModal(false);
    setPasswords({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  };

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
          {/* Profile Section */}
          {activeNav === "Profile" && (
            <div className="bg-[#0e2324] rounded-xl p-9 max-w-xl w-full text-[#e3f6fc] shadow-md mt-2 flex flex-col">
              <div className="text-xl font-semibold mb-4">Profile</div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="text-sm text-[#b5d7e5] mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value="Aditi"
                    readOnly
                    className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm text-[#b5d7e5] mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value="Pandey"
                    readOnly
                    className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
                  />
                </div>
              </div>

              <label htmlFor="contact" className="text-sm text-[#b5d7e5] mb-1">
                Contact
              </label>
              <input
                id="contact"
                type="text"
                value="9896975980"
                readOnly
                className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
              />

              <label htmlFor="gender" className="text-sm text-[#b5d7e5] mb-1">
                Gender
              </label>
              <input
                id="gender"
                type="text"
                value="Female"
                readOnly
                className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
              />

              <label htmlFor="dob" className="text-sm text-[#b5d7e5] mb-1">
                Date of Birth
              </label>
              <input
                id="dob"
                type="text"
                value="07/02/2005"
                readOnly
                className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="height" className="text-sm text-[#b5d7e5] mb-1">
                    Height
                  </label>
                  <input
                    id="height"
                    type="text"
                    value="170 cm"
                    readOnly
                    className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="text-sm text-[#b5d7e5] mb-1">
                    Weight
                  </label>
                  <input
                    id="weight"
                    type="text"
                    value="123 lb"
                    readOnly
                    className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg"
                  />
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
                  onClick={() => setShowChangePasswordModal(true)}
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

          {/* Change Password Modal */}
          {showChangePasswordModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#0e2324] rounded-xl p-6 w-[400px] text-[#e3f6fc] shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <label htmlFor="oldPassword" className="text-sm text-[#b5d7e5] mb-1 block">
                  Old Password
                </label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
                />

                <label htmlFor="newPassword" className="text-sm text-[#b5d7e5] mb-1 block">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
                />

                <label htmlFor="confirmNewPassword" className="text-sm text-[#b5d7e5] mb-1 block">
                  Confirm New Password
                </label>
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  value={passwords.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-transparent border border-[#244043] rounded-lg p-3 text-[#e3f6fc] text-lg mb-4"
                />

                <div className="flex justify-end gap-4">
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg text-sm font-semibold"
                    onClick={() => setShowChangePasswordModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#2ec4b6] text-white p-2 rounded-lg text-sm font-semibold"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
