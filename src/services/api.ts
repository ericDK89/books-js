import axios from "axios";

export const api = axios.create({
  baseURL: "https://books-js.vercel.app/api",
});
