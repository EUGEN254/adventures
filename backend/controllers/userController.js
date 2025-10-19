import validator from "validator";
import bcrypt from "bcrypt";
import pool from "../config/connectDb.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const registerUser = async (req, res) => {
  let connection;
  try {
    const { name, email, password, termsAccepted } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All Fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "email is invalid" });
    }
    if (!termsAccepted) {
      return res.json({
        success: false,
        message: "You must check the terms and conditions",
      });
    }
    if (!validator.isLength(password, { min: 6 })) {
      return res.json({
        success: false,
        message: "Password must be atleast 6 characters ",
      });
    }
    connection = await pool.getConnection();

    // check if user exist
    const [existing] = await connection.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    if (existing.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert user
    const [result] = await connection.query(
      "INSERT INTO users (name,email,password,terms_accepted) VALUES (?,?,?,?)",
      [name, email, hashedPassword, termsAccepted ? 1 : 0]
    );

    // create JWT
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // keep true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax works for localhost
    });

    return res.json({
      success: true,
      message: "User registered succesfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Register error", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};

const Login = async (req, res) => {
  let connection;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.json({ success: false, message: "No user with that email" });
    }
    const user = rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password try again",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // set token in cookie

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // keep true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax works for localhost
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }finally{
    if (connection) connection.release();
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // keep true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax works for localhost
    });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserData = async (req, res) => {
  let connection;
  try {
    const userId = req.user.id;

    connection = await pool.getConnection();

    const [rows] = await connection.query(
      "SELECT id, name, email, image FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userData = rows[0];

    res.json({ success: true, user: userData });
  } catch (error) {
    console.error("getUserData error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};

export { registerUser, Login, Logout, getUserData };
