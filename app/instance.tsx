import axios from "axios";
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://45.95.18.16:3000/api/"
      : "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
