import axios from "axios";
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.eksenpanel.com/api/"
      : "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
