import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    setTimeout(() => {
      // Simulate API call delay
      setLoading(false); // Stop loader

      const user = import.meta.env.VITE_LOGIN_USER;
      const pass = import.meta.env.VITE_LOGIN_PASSWORD;

      if (username === user && password === pass) {
        sessionStorage.setItem("username", username); // Store username in session
        navigate("/dashboard");
      } else {
        Swal.fire("Error", "Invalid Credentials!!", "error");
      }
    }, 2000); // 2-second delay
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100 overflow-hidden">
      {/* Background Shape */}
      <div
        className="absolute inset-0 bg-blue-700"
        style={{
          clipPath: "polygon(0 20%, 100% 0, 100% 80%, 0 100%)",
        }}
      ></div>

      {/* Login Form */}
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-md p-6 z-10">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-blue-600">Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.293a1 1 0 011.414 0L10 14.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading} // Disable button while loading
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
