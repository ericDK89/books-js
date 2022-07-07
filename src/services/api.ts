import axios from "axios";

export const api = axios.create({
  baseURL: "https://vercel.com/ericdk89/books-js/api",
});
