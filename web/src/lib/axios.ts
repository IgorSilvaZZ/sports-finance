import axios from "axios";
import { toast } from "sonner";

import { store } from "../store";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().responsible.token;

    if (token && token !== "") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.data?.statusCode;
    const message = error.response?.data?.message;

    if (statusCode === 400) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export { api };
