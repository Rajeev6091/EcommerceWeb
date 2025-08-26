import express from "express";
import { adminLogin, googleLogin, login, logOut, registration, resetPassword } from "../controller/authController.js";

const authRoutes = express.Router()

authRoutes.post("/registration", registration)
authRoutes.post("/login", login)
authRoutes.get("/logOut", logOut)
authRoutes.post("/googlelogin", googleLogin)
authRoutes.post("/adminlogin", adminLogin)
authRoutes.post("/reset-password", resetPassword);


export default authRoutes;