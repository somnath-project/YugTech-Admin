import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const user = import.meta.env.VITE_LOGIN_USER;
      const pass = import.meta.env.VITE_LOGIN_PASSWORD;

      if (username === user && password === pass) {
        sessionStorage.setItem("username", username);
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credentials!",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in-down">
            Welcome Back
          </h1>
          <p className="text-gray-300">Sign in to your admin account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center"
            >
              {loading ? (
                <ClipLoader color="#fff" size={24} />
              ) : (
                <span>Sign In</span>
              )}
            </button>

            <div className="text-center">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-gray-300 text-sm">
            © 2025 YugTech Academy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;