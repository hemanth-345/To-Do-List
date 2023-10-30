import React, { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // const handleSignUp = async () => {
  //   try {
  //     const response = await fetch("/api/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     console.log(response)

  //     if (response.ok) {
  //       setMessage("Registration successful");
  //     } else {
  //       const data = await response.json();
  //       setMessage(data.message || "Registration failed");
  //     }
  //   } catch (error) {
  //     setMessage("An error occurred during registration.");
  //   }
  // };
  


  const handleSignUp = async () => {
    try {
      // Client-side validation
      if (!email || !password) {
        setMessage("Please provide both email and password.");
        return;
      }
  
      // Email validation using a regular expression
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
        setMessage("Invalid email address.");
        return;
      }
  
      // Password validation (you can customize this as per your requirements)
      if (password.length < 8) {
        setMessage("Password must be at least 8 characters long.");
        return;
      }
  
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        setMessage("Registration successful.");
      } else {
        const data = await response.json();
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
    }
  };
  

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;
