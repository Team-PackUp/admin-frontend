import axios from "axios";
import { attachAuthInterceptors } from "./interceptors";

export const apiClient = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

export const apiFilesClient = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

attachAuthInterceptors(apiClient);
attachAuthInterceptors(apiFilesClient);

export default apiClient;
