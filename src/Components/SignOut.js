import React from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user

      // Clear the browser history and navigate to the login page
      navigate("/", { replace: true });
    } catch (error) {
      alert("Error signing out: " + error.message);
    }
  };

  return (
    <div>
    <button className="signOut" onClick={handleSignOut} style={{ padding: "10px 20px", cursor: "pointer" }}>
      Sign Out
    </button></div>
  );
};

export default SignOut;
