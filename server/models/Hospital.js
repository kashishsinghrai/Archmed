const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: "" },
    licenseNumber: { type: String, required: true },
    specialties: { type: [String], default: [] },
    contactNumber: { type: String, default: "" },
    about: { type: String, default: "" },
    isApproved: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    role: { type: String, default: "hospital" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hospital", hospitalSchema);
