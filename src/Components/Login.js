import React, { useState } from "react";
  import { auth, database } from "../Firebase"; // Ensure Firebase is set up
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { ref, get } from "firebase/database";
  import { useNavigate } from 'react-router-dom';

  const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  const pageHandle = () => navigate('/comp/StaffHome');

    const handleLogin = async () => {
      try {
        // Retrieve the email associated with the username
        const snapshot = await get(ref(database, "users"));
        if (snapshot.exists()) {
          const users = snapshot.val();
          const userEntry = Object.values(users).find(
            (user) => user.username === username
          );
  
          if (!userEntry) {
            alert("Username not found.");
            return;
          }
  
          const email = userEntry.email; // Get the email linked to the username
  
          // Use email and password to sign in
          await signInWithEmailAndPassword(auth, email, password);
          pageHandle();
        } else {
          alert("No users found.");
        }
      } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Login failed: " + error.message);
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  
  export default Login;
  