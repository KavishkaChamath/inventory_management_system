import React, { useState } from "react";
import { auth, database } from "../Firebase"; // Ensure you import Firebase database instance
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, get, set, query, orderByChild, equalTo } from "firebase/database";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("admin");

  const handleSignUp = async () => {
    if (!username.trim()) {
      alert("Please enter a username.");
      return;
    }

    try {
      // Check if username already exists in users node
      const usersRef = ref(database, "users");
      const usernameQuery = query(usersRef, orderByChild("username"), equalTo(username));
      const snapshot = await get(usernameQuery);

      if (snapshot.exists()) {
        alert("Username already taken. Please choose another one.");
        return;
      }

      // Proceed with user signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save user data to Firebase
      const userData = {
        username,
        email,
        accountType,
      };
      await set(ref(database, `users/${userId}`), userData);

      alert("User signed up successfully!");
      setEmail("");
      setPassword("");
      setUsername("");
      setAccountType("admin");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div className='bg'> 
    <table border={0} width='100%'height='70px'>
      <tr>
        <td className='heading'>Sign Up</td>
        </tr></table><center>
        <div className="signupBox">
      <input className="usName"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br></br>
      <input className="mail"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br></br>
      <input className="psw"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <label>
          Account Type: 
          <select className="type"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </label>
      </div>
      <button className='signupBtn'onClick={handleSignUp}>Sign Up</button>
    </div></center>
    </div>
  );
};

export default SignUp;
