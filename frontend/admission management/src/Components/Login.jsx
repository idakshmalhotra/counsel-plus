import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const usernameref = useRef();
  const passwordref = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameref.current.value;
    const password = passwordref.current.value;

    try {
      const response = await axios.post("http://localhost:3000/signin", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      console.log("Login successful:", response.data);
      console.log("Redirecting to dashboard...");

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              required
              ref={usernameref}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordref}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
