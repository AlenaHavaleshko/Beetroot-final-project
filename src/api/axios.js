import axiosLib from "axios";

import { REST_API_URL } from "./constants"
 
const axios = axiosLib.create({
  baseURL: REST_API_URL,
  headers: { "Content-Type": "application/json" }
});

export default axios;