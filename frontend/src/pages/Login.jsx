import React, { useContext, useState } from "react";
import Logo from "../assets/vcart_logo.png";
import Google from "../assets/google_logo.png";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";
import Loading from "../../../admin/src/component/Loading";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Login Successfully");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );
      toast.success("Login Successfully");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col">

      {/* TOP NAVBAR */}
      <nav className="w-full bg-blue-600 text-white flex items-center justify-between px-4 py-2 shadow">
        <div className="text-sm sm:text-base font-medium">
          SuperCart
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
        <div className="w-full max-w-md bg-white rounded-md shadow-md border border-gray-200 flex flex-col items-center p-0">

          {/* Blue top line */}
          <div className="w-full h-1 bg-blue-500 rounded-t-md" />

          {/* Card Content */}
          <div className="w-full flex flex-col items-center p-8">
            {/* Logo */}
            <img src={Logo} alt="OneCart Logo" className="w-24 mb-4" />

            {/* Heading */}
            <h2 className="text-xl font-semibold mb-6">Sign In</h2>

            {/* Form */}
            <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={loading ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setLoading(!loading)}
                  className="absolute inset-y-0 right-3 text-gray-500 focus:outline-none"
                >
                  {loading ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {loading ? <Loading /> : "Login"}
              </button>

              {/* Inline Registration and Reset Password */}
              <div className="flex w-full gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  New Registration
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/reset-password")}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Reset Password
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 my-6"></div>

            {/* Google Login Section */}
            <div className="w-full">
              <button
                type="button"
                onClick={googleLogin}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-50 transition"
              >
                <img src={Google} alt="Google" className="w-5 h-5" />
                <span className="text-sm">Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
