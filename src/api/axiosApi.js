import axios from "axios";
import { getCookies } from "./cookieControler";

export const baseUrl = process.env.REACT_APP_SERVER;

export const instance = axios.create({
  baseURL: baseUrl,
  headers: { "Access-Control-Allow-Origin": "*" },
});

// instance.interceptors.request.use((config) => {
//   if (config.headers === undefined) return;
//   const token = getCookies("id");
//   config.headers["Authorization"] = `${token}`;
//   return config;
// });
