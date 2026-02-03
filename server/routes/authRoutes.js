const express = require("express");
const router = express.Router();

const {
  registerHospital,
  login,
  registerPatient,
  loginPatient,
} = require("../controllers/authController");

// Hospital register
router.post("/register", registerHospital);

// 🔥 Unified Login (Admin + Hospital)
router.post("/login", login);

// Patient Routes
router.post('/patient/register', registerPatient);
router.post('/patient/login', loginPatient);

module.exports = router;
