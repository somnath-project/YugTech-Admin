import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate a simple token (in real app, use proper token generation)
    const token = Math.random().toString(36).substr(2);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email: email,
          reset_link: `${window.location.origin}/reset-password/${token}`,
          username: import.meta.env.VITE_LOGIN_USER,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "Password reset link sent to your email",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send reset email",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-300">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                <span>Send Reset Link</span>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                Back to Login
              </button>
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

export default ForgotPassword;