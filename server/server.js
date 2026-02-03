const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// 1. Import Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const patientRoutes = require("./routes/patientRoutes");

// 2. Config
dotenv.config();
connectDB();

const app = express();

// 3. Updated CORS Middleware for Deployment
// यहाँ अपनी सटीक Vercel URL डालें (बिना आखिरी '/')
const allowedOrigins = ["https://archmed.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // ऑरिजिन चेक करें या बिना ऑरिजिन वाली रिक्वेस्ट (जैसे Postman) को अनुमति दें
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(
          new Error("CORS Policy Violation: Access Denied by Archmed Protocol"),
        );
      }
    },
    credentials: true, // टोकन और कुकीज़ को सिंक करने के लिए अनिवार्य
  }),
);

app.use(express.json()); // डेटा (req.body) पढ़ने के लिए आवश्यक

// 4. Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/patient", patientRoutes);

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Archmed Server running on port ${PORT}`),
);
