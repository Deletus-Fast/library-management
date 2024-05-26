import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [Id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginCall = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        onLogin(Id); // Call the callback function with user data upon successful login
      } else {
        // setError(data.error); // Update error state with the error message
        setError("Username or Pasword is incorrect.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginCall();
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="form-title">Admin Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="admissionId">ID</label>
            <input
              type="text"
              id="admissionId"
              value={Id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
