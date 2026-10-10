
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const API_ORIGIN = API_BASE_URL.replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Build URLs for uploaded files
export const fileUrl = (filePath) => {
  if (!filePath) return "";

  // Return absolute URLs unchanged
  if (/^https?:\/\//i.test(filePath)) {
    return filePath;
  }

  // Uploads are served from the backend root, not /api
  return `${API_ORIGIN}/${filePath.replace(/^\/+/, "")}`;
};

export default api;
