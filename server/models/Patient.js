const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    address: { type: String },
    bloodGroup: { type: String },
    role: { type: String, default: "patient" }, // Role is Patient
  },
  { timestamps: true },
);

module.exports = mongoose.model("Patient", patientSchema);
