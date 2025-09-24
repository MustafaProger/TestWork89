import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10_000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  },
);
