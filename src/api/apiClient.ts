import axios from "axios";
import qs from "qs";
import { attachAuthInterceptors } from "./interceptors";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  },
});

export const apiFilesClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

attachAuthInterceptors(apiClient);
attachAuthInterceptors(apiFilesClient);

export default apiClient;
