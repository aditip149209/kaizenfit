import admin from "firebase-admin";
import serviceAccount from "../serviceAccount.json" with { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  const idToken = header.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; 
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
}

//this has similar functionality to your protect function which you created with your own jwt code



