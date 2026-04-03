import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api"; 

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Sync user with backend database
      await api.get('/syncUser');
      
      navigate("/dashboard"); // Redirect to your command center
    } catch (err: any) {
      setError("ACCESS DENIED: Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
        const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
        
        // Sync user with backend database
        await api.get('/syncUser');
        
        navigate('/dashboard');
    }
    catch(err: any){
        setError("Google auth failure" + err.message);
    }
    finally{
        setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-kaizen-gray p-4">
      <div className="w-full max-w-md bg-white border-3 border-kaizen-black shadow-neo">
        
        {/* Header */}
        <div className="bg-kaizen-green border-b-3 border-kaizen-black p-4 text-center">
          <h1 className="font-heading text-2xl uppercase tracking-tighter text-kaizen-black">
            System Entry
          </h1>
        </div>

        <div className="p-8 pb-0">
            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white text-black font-heading uppercase py-4 text-lg border-3 border-black shadow-neo hover:shadow-none transition-all flex items-center justify-center gap-3"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.51 19.27 6.05 15.38 6.05 12s2.46-7.27 6.05-7.27c1.66 0 3.14.65 4.19 1.63l2.09-2.09C16.89 2.91 14.65 2 12.1 2 6.6 2 2.1 6.5 2 12s4.5 10 10 10c5.38 0 9.5-3.83 9.5-9.69 0-.61-.08-1.16-.15-1.21z" />
                </svg>
                ACCESS VIA GOOGLE
            </button>
            
            <div className="flex items-center gap-4 py-6">
                <div className="h-0.5 bg-black flex-1"></div>
                <span className="font-mono text-sm font-bold">OR USE ID</span>
                <div className="h-0.5 bg-black flex-1"></div>
            </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          
          {error && (
            <div className="bg-kaizen-alert/20 border-2 border-kaizen-alert p-3 text-red-700 font-mono text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block font-heading uppercase text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-3 border-kaizen-black p-3 font-mono focus:outline-none focus:bg-kaizen-green/20 placeholder:text-gray-400"
              placeholder="user@kaizen.net"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-heading uppercase text-sm">Passcode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-3 border-kaizen-black p-3 font-mono focus:outline-none focus:bg-kaizen-green/20 placeholder:text-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-kaizen-black text-kaizen-green font-heading uppercase py-4 text-lg border-2 border-kaizen-black shadow-[4px_4px_0px_0px_#00FF94] hover:shadow-none transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Execute Login_"}
          </button>

          <div className="text-center font-mono text-sm pt-4">
            <span>NO CLEARANCE? </span>
            <Link to="/register" className="underline font-bold hover:bg-kaizen-green hover:text-black transition-colors px-1">
              INITIALIZE NEW USER
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}