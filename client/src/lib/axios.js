import axios from "axios";

// यह यूटिलिटी आपके पूरे प्रोजेक्ट के लिए API बेस URL सेट करती है
const api = axios.create({
  // अगर .env फाइल है तो वहां से URL लेगा, नहीं तो localhost:5000
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
});

// Request interceptor: हर रिक्वेस्ट के साथ टोकन भेजने के लिए
api.interceptors.request.use((config) => {
  const userInfo =
    typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;
  const user = userInfo ? JSON.parse(userInfo) : null;

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
