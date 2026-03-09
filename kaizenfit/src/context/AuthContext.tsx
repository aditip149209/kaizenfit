import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase"; // This imports the 'auth' service we just fixed

// 1. Define the shape of the data we are broadcasting
// We share the 'user' object (if logged in) and a 'loading' flag
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// 2. Create the Context (The "WiFi Router")
// We start with default values (user is null, loading is true)
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// 3. Create the Provider (The "Broadcasting Station")
// You will wrap your entire app with this component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 4. The Listener (The "Antenna")
    // This function from Firebase watches for login/logout events in real-time.
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Optional: Log the token for debugging (remove this in production)
        const token = await currentUser.getIdToken();
        console.log("Logged in with token:", token); 
      }
      
      // Once we have a user (or know there isn't one), we stop loading
      setLoading(false);
    });

    // Cleanup: Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    // 5. Broadcast the values
    <AuthContext.Provider value={{ user, loading }}>
      {/* Only render the app (children) after we have checked auth status. 
          This prevents the app from flickering or kicking the user out mistakenly. */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 6. Create the Hook (The "Receiver")
// This is a shortcut so you don't have to import useContext in every file.
export const useAuth = () => useContext(AuthContext);