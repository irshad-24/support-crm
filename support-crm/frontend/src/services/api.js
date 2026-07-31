import axios from "axios";

const api = axios.create({
  baseURL: "https://support-crm-production-2a43.up.railway.app/api",
});

export default api;