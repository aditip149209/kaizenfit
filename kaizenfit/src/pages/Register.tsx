import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPass) {
      return setError("ERROR: Passcodes do not match");
    }

    setLoading(true);
    setError("");

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      
      // Sync user with backend database
      await axios.get('http://localhost:3000/api/syncUser', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Redirect to onboarding for new users
      navigate("/onboarding");
    } catch (err: any) {
      setError("CREATION FAILED: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-kaizen-gray p-4">
      <div className="w-full max-w-md bg-white border-3 border-kaizen-black shadow-neo">
        
        {/* Header */}
        <div className="bg-black border-b-3 border-kaizen-black p-4 text-center">
          <h1 className="font-heading text-2xl uppercase tracking-tighter text-kaizen-green">
            Initialize User
          </h1>
        </div>

        {/* Form Body */}
        <form onSubmit={handleRegister} className="p-8 space-y-6">
          
          {error && (
            <div className="bg-kaizen-alert/20 border-2 border-kaizen-alert p-3 text-red-700 font-mono text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block font-heading uppercase text-sm">Assign Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-3 border-kaizen-black p-3 font-mono focus:outline-none focus:bg-kaizen-green/20"
              placeholder="new_user@kaizen.net"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-heading uppercase text-sm">Set Passcode</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border-3 border-kaizen-black p-3 font-mono focus:outline-none focus:bg-kaizen-green/20"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block font-heading uppercase text-sm">Confirm</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full bg-white border-3 border-kaizen-black p-3 font-mono focus:outline-none focus:bg-kaizen-green/20"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-kaizen-green text-kaizen-black font-heading uppercase py-4 text-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : "Create Record_"}
          </button>

          <div className="text-center font-mono text-sm pt-4">
            <span>ALREADY IN SYSTEM? </span>
            <Link to="/login" className="underline font-bold hover:bg-kaizen-black hover:text-white transition-colors px-1">
              LOGIN
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}