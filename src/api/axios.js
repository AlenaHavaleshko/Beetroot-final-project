import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: "https://fakestoreapi.com",
  headers: { "Content-Type": "application/json" }
});

export default axios;