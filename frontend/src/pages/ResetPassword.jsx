import React, { useState, useContext } from "react";
import Logo from "../assets/vcart_logo.png";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email },
        { withCredentials: true }
      );
      toast.success("Password reset link sent!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
      {/* TOP NAVBAR */}
      <nav className="w-full bg-blue-600 text-white flex items-center justify-between px-4 py-2 shadow">
        <div className="text-sm sm:text-base font-medium">SuperCart</div>
        <button
          onClick={() => navigate("/")}
          className="text-xs sm:text-sm bg-green-500 hover:bg-green-600 rounded px-3 py-1 transition"
        >
          Home
        </button>
      </nav>

      {/* PAGE CONTENT */}
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-md shadow-md border border-gray-200 flex flex-col items-center p-0">

          {/* Blue top line */}
          <div className="w-full h-1 bg-blue-500 rounded-t-md" />

          {/* Card Content */}
          <div className="w-full flex flex-col items-center p-8">
            {/* Logo */}
            <img src={Logo} alt="OneCart Logo" className="w-24 mb-4" />

            {/* Heading */}
            <h2 className="text-xl font-semibold mb-6">Reset Password</h2>

            {/* Form */}
            <form className="w-full flex flex-col gap-4" onSubmit={handleReset}>
              {/* Email */}
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
