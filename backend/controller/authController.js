import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { gentoken, gentoken1 } from "../config/token.js";

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid Email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Enter strong password" })
        }

        let hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashPassword })
        let token = await gentoken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log("registration error")
        return res.status(500).json({ message: `registration Error ${error}` })
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User is not found" })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        let token = await gentoken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        })
        return res.status(201).json({ user })
    } catch (error) {
        console.log("login error")
        return res.status(500).json({ message: `login Error ${error}` })
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "logout succesfull" })
    } catch (error) {
        console.log("logout error")
        return res.status(500).json({ message: `logout Error ${error}` })
    }
}

export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({ name, email })
        }
        let token = await gentoken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000
        })
        return res.status(200).json({ user })

    } catch (error) {
        console.log("google login error")
        return res.status(500).json({ message: `google login Error ${error}` })
    }
}

export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body
        if (email === "admin@onecart.com" && password === "admin12345678") {
            let token = await gentoken1(email)
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 1 * 24 * 60 * 1000
            })
            return res.status(200).json(token)
        }
        return res.status(200).json({message:"Invalid Credentials"})

    } catch (error) {
        console.log("adminlogin error")
        return res.status(500).json({ message: `admin login Error ${error}` })
    }
}

export const resetPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Validate email presence
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Enter valid email" });
      }
  
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // In production: generate reset token, store in DB, send email
      console.log(`Reset link would be sent to: ${email}`);
  
      return res.status(200).json({ message: "Reset link sent (simulated)" });
    } catch (error) {
      console.log("reset password error", error);
      return res.status(500).json({ message: `Reset password error: ${error}` });
    }
  };
  