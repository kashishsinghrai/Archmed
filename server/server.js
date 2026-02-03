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
const allowedOrigins = ["https://archmed.vercel.app", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(
          new Error("CORS Policy Violation: Access Denied by Archmed Protocol"),
        );
      }
    },
    credentials: true, 
  }),
);

app.use(express.json()); 

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
