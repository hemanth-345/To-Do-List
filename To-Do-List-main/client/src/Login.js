import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

      

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data)
  //       const token = data.user; 
  //       console.log(token['email'])
  //       console.log(token['password'])
  //       console.log(token["items"])
  //       setError("");
  //       onLogin(true,token["items"]);
  //     } else {
  //       setError("Invalid email or password.");
  //     }
  //   } catch (error) {
  //     setError("An error occurred during login.");
  //   }
  // };

  

  const handleLogin = async () => {
    try {
      // Client-side validation
      if (!email || !password) {
        setError("Please provide both email and password.");
        return;
      }
  
      // Email validation using a regular expression
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
        setError("Invalid email address.");
        return;
      }
  
      // Password validation (you can customize this as per your requirements)
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }
  
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.user;
        setError("");
        onLogin(true, token.items);
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };
  
  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
