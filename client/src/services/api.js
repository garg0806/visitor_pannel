import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Strip env base to file path, prefix with API origin
export const fileUrl = (filePath) => {
  if (!filePath) return "";
  if (/^https?:\/\//i.test(filePath)) return filePath;
  const base =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const origin = base.replace(/\/api\/?$/, "");
  return `${origin}${filePath.startsWith("/") ? filePath : `/${filePath}`}`;
};

export default api;
