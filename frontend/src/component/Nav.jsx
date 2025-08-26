import React, { useContext, useState } from "react";
import logo from "../assets/vcart_logo.png";
import { IoMdHome } from "react-icons/io";
import { IoSearchOutline, IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContactSupport } from "react-icons/md";
import { shopDataContext } from "../context/ShopContext";
import { toast } from "react-toastify";

function Nav() {
  const { getCurrentUser, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      toast.success("Logout Successfully");
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-blue-600 text-white flex items-center justify-between px-4 h-14 shadow-sm z-50">

      {/* Left: Logo and Title */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-semibold">SuperCart</span>
      </div>

      {/* Center: Desktop Links */}
      <nav className="hidden md:flex gap-6 text-sm">
        <button onClick={() => navigate("/")} className="hover:underline cursor-pointer">Home</button>
        <button onClick={() => navigate("/collections")} className="hover:underline cursor-pointer">Collections</button>
        <button onClick={() => navigate("/about")} className="hover:underline cursor-pointer">About</button>
        <button onClick={() => navigate("/contact")} className="hover:underline cursor-pointer">Contact</button>
      </nav>

      {/* Right: Icons */}
      <div className="flex items-center gap-4 relative">

        {/* Search */}
        <div className="relative flex items-center gap-2">
          {showSearch && (
            <input
              type="text"
              placeholder="Search Here"
              className="w-48 md:w-60 bg-white text-black rounded px-3 py-1 shadow transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          {showSearch ? (
            <IoSearchCircle
              className="w-5 h-5 cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoSearchOutline
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setShowSearch(true);
                navigate("/collections");
              }}
            />
          )}
        </div>


        {/* User/Profile */}
        {!userData ? (
          <FaUserCircle
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowProfile(prev => !prev)}
          />
        ) : (
          <div
            className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold cursor-pointer"
            onClick={() => setShowProfile(prev => !prev)}
          >
            {userData.name.slice(0, 1).toUpperCase()}
          </div>
        )}

        {showProfile && (
          <div className="absolute top-12 right-0 bg-white text-black rounded shadow w-48 z-50">
            <ul className="flex flex-col">
              {!userData && (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => { navigate("/login"); setShowProfile(false); }}
                >
                  Login
                </li>
              )}
              {userData && (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => { handleLogout(); setShowProfile(false); }}
                >
                  Logout
                </li>
              )}
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { navigate("/order"); setShowProfile(false); }}
              >
                Orders
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { navigate("/about"); setShowProfile(false); }}
              >
                About
              </li>
            </ul>
          </div>
        )}

        {/* Cart */}
        <div className="relative cursor-pointer hidden md:block" onClick={() => navigate("/cart")}>
          <IoMdCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-xs rounded-full px-1">
            {getCartCount()}
          </span>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-14 bg-blue-600 flex justify-around items-center text-white md:hidden">
        <button onClick={() => navigate("/")} className="flex flex-col items-center text-xs">
          <IoMdHome className="w-5 h-5" /> Home
        </button>
        <button onClick={() => navigate("/collections")} className="flex flex-col items-center text-xs">
          <HiOutlineCollection className="w-5 h-5" /> Collections
        </button>
        <button onClick={() => navigate("/contact")} className="flex flex-col items-center text-xs">
          <MdContactSupport className="w-5 h-5" /> Contact
        </button>
        <button onClick={() => navigate("/cart")} className="relative flex flex-col items-center text-xs">
          <IoMdCart className="w-5 h-5" /> Cart
          <span className="absolute -top-1 -right-2 bg-white text-blue-600 text-[10px] rounded-full px-1">
            {getCartCount()}
          </span>
        </button>
      </nav>
    </header>
  );
}

export default Nav;
