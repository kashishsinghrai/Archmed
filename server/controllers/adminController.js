const Hospital = require("../models/Hospital");

// 1. Get Pending
exports.getPendingHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({ isApproved: "Pending" }).select(
      "-password",
    );
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Verify (Approve/Reject)
exports.verifyHospital = async (req, res) => {
  const { id, status } = req.body; // Frontend sends { id, status }
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      id,
      { isApproved: status },
      { new: true },
    );
    res.json({ message: `Hospital ${status}`, hospital });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get Approved (New)
exports.getApprovedHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({ isApproved: "Approved" }).select(
      "-password",
    );
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
