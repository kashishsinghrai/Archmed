const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital", // Relation with Hospital Model
      required: true,
    },
    name: {
      type: String,
      required: [true, "Doctor name is required"],
    },
    specialization: {
      type: String, // e.g., Cardiologist, Dentist
      required: [true, "Specialization is required"],
    },
    degree: {
      type: String, // e.g., MBBS, MD
      required: [true, "Degree is required"],
    },
    experience: {
      type: Number, // Years of experience
      required: [true, "Experience is required"],
    },
    fees: {
      type: Number, // Consultation Fees
      required: [true, "Fees are required"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Doctor", doctorSchema);
