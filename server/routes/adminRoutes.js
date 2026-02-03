const express = require("express");
const router = express.Router();
const {
  getPendingHospitals,
  verifyHospital,
  getApprovedHospitals,
} = require("../controllers/adminController");

// 1. Get Pending Requests
router.get("/pending", getPendingHospitals);

// 2. Get Approved Hospitals (New Route for the page we just made)
router.get("/approved", getApprovedHospitals);

// 3. Approve or Reject (Matches the Frontend API call)
router.put("/verify", verifyHospital);

module.exports = router;
