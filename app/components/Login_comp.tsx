
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/UserContext";

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useUserContext();
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Login successful:", data);
      setUserId(data.userId);
      router.push("/todo");
    } else {
      setError(data.message || 'Login failed. Please check your credentials.');
      console.error("Error:", data.message);
    }
  };

  const handleRegister = async () => {

    if (!username || !password) {
      console.error("Username and password are required");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created:", data);
        handleLogin()
      } else {
        setError(data.message || 'User already exists');
      }
    } catch (error) {
      setError('Registration failed');
      console.error("An error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-xl p-6">
        <div className="card-body">
          <div className="card-actions justify-start space-x">User name</div>
          <input type="text" placeholder="Username" className="input input-bordered w-full mb-4" value={username} onChange={(e) => setUsername(e.target.value)} />
          <div className="card-actions justify-start space-x">Password</div>
          <input type="password" placeholder="Password" className="input input-bordered w-full mb-4" value={password} onChange={(e) => setPassword(e.target.value)}  onKeyDown={handleKeyDown}/>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="card-actions justify-center space-x">
            <button className="btn flex items-center btn-outline border-green-700 hover:border-green-700 hover:bg-green-700 hover:bg-opacity-20" onClick={handleLogin}>
              <div className="text-lg text-green-600">Login</div>
            </button>
            <button className="btn flex items-center btn-outline border-red-700 hover:border-red-700 hover:bg-red-700 hover:bg-opacity-20" onClick={handleRegister}>
              <div className="text-lg text-red-600">Register</div>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
