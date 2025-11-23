import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { app } from "../firebase"; // keep this as-is if your firebase exports a named app
import { useNavigate } from "react-router-dom";
import GoogleButtonImport from "react-google-button";

// Resolve possible default/named interop issues:
const GoogleButton = GoogleButtonImport?.default ?? GoogleButtonImport;

export const Oauth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const allowedDomain = "@iitrpr.ac.in";

  console.log("Resolved GoogleButton:", GoogleButton, "typeof:", typeof GoogleButton);

  const HandleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      if (!result || !result.user) {
        alert("Login didn't complete. Please try again.");
        return;
      }

      const firebaseUser = result.user;
      const email = (firebaseUser.email || "").toLowerCase();
      if (!email) {
        await signOut(auth).catch(() => { });
        alert("No email found on this Google account.");
        return;
      }
      if (!email.endsWith(allowedDomain)) {
        await signOut(auth).catch(() => { });
        alert(`Please sign in with your college email (${allowedDomain})`);
        return;
      }

      const idToken = await firebaseUser.getIdToken();
      const BASE_URI = "http://localhost:3000";

      const response = await axios.post(
        `${BASE_URI}/google-login`,
        {
          googleId: firebaseUser.uid,
          name: firebaseUser.displayName || email.split("@")[0],
          email: firebaseUser.email,
          profilePic: firebaseUser.photoURL || null,
        },
        {
          headers: { Authorization: `Bearer ${idToken}` },
          withCredentials: true,
        }
      );

      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
// after successful /google-login response
localStorage.setItem("googleId", response.data.user.google_id);

      if (response.data.exists) {
        if (response.data.profileComplete) {
          navigate("/");        
        } else {
          navigate("/create-profile", { state: response.data.user }); 
        }
      } else {
        navigate("/create-profile", { state: response.data.user });  
      }

    } catch (error) {
      console.error("OAuth Error:", error);
      if (error?.code === "auth/popup-closed-by-user") return;
      alert("Login failed. See console for details.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center w-96">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <p className="text-gray-600 mb-6">Sign in with your college account</p>
        <div className="px-8">
          {/* Use the resolved component (guarded above). This component does NOT accept children. */}
          {typeof GoogleButton === "function" ? (
            <GoogleButton onClick={HandleClick} />
          ) : (
            // Fallback UI if the package isn't usable
            <button
              onClick={HandleClick}
              className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
