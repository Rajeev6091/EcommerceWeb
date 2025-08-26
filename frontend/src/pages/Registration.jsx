import React, { useContext, useState } from "react";
import Logo from "../assets/vcart_logo.png";
import Google from "../assets/google_logo.png";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Registration() {
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        serverUrl + "/api/auth/registration",
        { name, email, password },
        { withCredentials: true }
      );
      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration error");
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );
      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* TOP NAVBAR */}
      <nav className="w-full bg-blue-600 text-white flex items-center justify-between px-4 py-2 shadow">
        <div className="text-sm sm:text-base font-medium">
          SuperCart Registration Portal
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-xs sm:text-sm bg-green-500 hover:bg-green-600 rounded px-3 py-1 transition"
        >
          Home
        </button>
      </nav>

      {/* PAGE CONTENT */}
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white shadow-md border border-gray-200 rounded-lg">
          
          {/* Top Blue Line */}
          <div className="h-1 bg-blue-500 rounded-t-lg" />

          {/* Card Content */}
          <div className="flex flex-col items-center py-6 px-4">
            <img src={Logo} alt="Logo" className="w-20 h-20 mb-2" />
            <h2 className="text-xl font-semibold mb-4">Register User</h2>

            <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">

              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-gray-500 focus:outline-none"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Register
                </button>
                {/* <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setPassword("");
                  }}
                  className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition"
                >
                  Reset
                </button> */}
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4 w-full">
              <div className="flex-grow border-t border-gray-300" />
              <span className="px-2 text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google Registration */}
            <button
              type="button"
              onClick={googleSignup}
              className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded w-full hover:bg-gray-50 transition"
            >
              <img src={Google} alt="Google" className="w-6 h-6" />
              <span className="text-sm font-medium">Register with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
