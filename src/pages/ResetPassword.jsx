import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      setLoading(false);
      return;
    }

    // In real app, verify token and update password in backend
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been reset successfully",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
      navigate("/");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-300">Create your new password</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  placeholder="Enter new password"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center"
            >
              {loading ? (
                <ClipLoader color="#fff" size={24} />
              ) : (
                <span>Reset Password</span>
              )}
            </button>
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

export default ResetPassword;