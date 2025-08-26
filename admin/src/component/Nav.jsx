import React, { useContext } from 'react';
import logo from '../assets/vcart_logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';

function Nav() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);

  const logOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-blue-600 text-white flex items-center justify-between px-6 shadow-sm z-50">
      {/* Left: Logo + App Name */}
      <div
        className="flex items-center gap-3 cursor-pointer w-1/3"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-semibold">OneCart</span>
      </div>
  
      {/* Center: Title */}
      <div className="text-center w-1/3 hidden md:block">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>
  
      {/* Right: Buttons */}
      <div className="flex items-center justify-end gap-4 w-1/3">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-blue-600 text-sm font-medium py-1.5 px-4 rounded hover:bg-gray-100 transition"
        >
          Home
        </button>
        <button
          onClick={logOut}
          className="bg-white text-blue-600 text-sm font-medium py-1.5 px-4 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
  
}

export default Nav;
