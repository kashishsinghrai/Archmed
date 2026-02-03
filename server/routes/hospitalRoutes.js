const express = require("express");
const router = express.Router();

const {
  addDoctor,
  getDoctors,
  deleteDoctor,
  getAppointments,
  getDashboardStats,
  getHospitalProfile,
  updateHospitalProfile,
  getPatientDetails,
  updateAppointmentStatus,
} = require("../controllers/hospitalController");

const { protect } = require("../middleware/authMiddleware");

// --- 🏥 HOSPITAL PROFILE & SETTINGS ---
router.get("/profile", protect, getHospitalProfile);
router.put("/update-profile", protect, updateHospitalProfile);

// --- 👨‍⚕️ DOCTOR MANAGEMENT ---
router.post("/add-doctor", protect, addDoctor);
router.get("/doctors", protect, getDoctors);
router.delete("/delete-doctor/:id", protect, deleteDoctor);

// --- 📅 APPOINTMENT MANAGEMENT ---
router.get("/appointments", protect, getAppointments);
router.put("/appointment/:id", protect, updateAppointmentStatus);

// --- 📊 DASHBOARD & PATIENT DETAILS ---
router.get("/stats", protect, getDashboardStats);
router.get("/patient/:id", protect, getPatientDetails);

module.exports = router;
