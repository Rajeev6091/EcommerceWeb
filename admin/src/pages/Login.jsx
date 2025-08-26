import React, { useContext, useState } from 'react';
import Logo from '../assets/vcart_logo.png';
import axios from "axios";
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Login() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { serverUrl } = useContext(authDataContext);
  const [showPassword, setShowPassword] = useState(false);
  let { adminData, getAdmin } = useContext(adminDataContext);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + "/api/auth/adminlogin", { email, password }, { withCredentials: true });
      console.log(result.data);
      await getAdmin();
      navigate('/');
    } catch (error) {
      console.log("error");
      toast.success("Admin Login Failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center px-4">

      {/* Header Bar */}
      <div className="w-full bg-blue-600 flex items-center justify-between px-4 py-2 text-white fixed top-0 left-0">
        <div className="text-sm font-semibold cursor-pointer" onClick={() => navigate("/")}>
          SuperCart
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      {/* Spacer to account for fixed header */}
      <div className="h-[50px]"></div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-md shadow-md border border-gray-200 flex flex-col items-center p-0 mt-4">
        
        {/* Blue Top Border */}
        <div className="w-full h-1 bg-blue-500 rounded-t-md" />

        {/* Card Content */}
        <div className="w-full flex flex-col items-center p-8">
          <img src={Logo} alt="Logo" className="w-20 mb-4" />

          <h2 className="text-xl font-semibold mb-6">Sign In</h2>

          <form className="w-full flex flex-col gap-4" onSubmit={AdminLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm focus:outline-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? <Loading /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
