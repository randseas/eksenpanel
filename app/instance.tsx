"use client";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://servername.onrender.com/api/"
      : "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
