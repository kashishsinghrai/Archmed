const express = require("express");
const router = express.Router();
const {
  searchHospitals, 
  getHospitalDetails, 
  searchDoctors,
  bookAppointment,
  getMyAppointments,
  getProfile,
  updateProfile,
} = require("../controllers/patientController");

const { protect } = require("../middleware/authMiddleware");

// --- 🌐 PUBLIC ROUTES (No Login Required) ---

router.get("/hospitals", searchHospitals);

router.get("/hospital/:id", getHospitalDetails);

router.get("/search", searchDoctors);

// --- 🔐 PROTECTED ROUTES (Login Required) ---

router.post("/book", protect, bookAppointment);

router.get("/my-appointments", protect, getMyAppointments);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

module.exports = router;
