const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Hospital = require("../models/Hospital");

// 1. Add Doctor (Node Deployment)
exports.addDoctor = async (req, res) => {
  try {
    const { name, specialization, degree, experience, fees } = req.body;
    // Auth Middleware से ID प्राप्त करना
    const hospitalId = req.user.id || req.user._id;

    if (!name || !specialization || !degree || !experience || !fees) {
      return res
        .status(400)
        .json({ message: "Infrastructure Error: Mandatory fields missing" });
    }

    const doctor = await Doctor.create({
      hospitalId,
      name,
      specialization,
      degree,
      experience: Number(experience),
      fees: Number(fees),
      isAvailable: true,
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Registry Error: " + error.message });
  }
};

// 2. Get All Doctors Linked to Hospital
exports.getDoctors = async (req, res) => {
  try {
    const hospitalId = req.user.id || req.user._id;
    const doctors = await Doctor.find({ hospitalId }).sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHospitalProfile = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.user.id).select("-password");
    
    if (!hospital) {
      return res.status(404).json({ message: "Infrastructure Node not found" });
    }
    
    res.json(hospital); 
  } catch (error) {
    res.status(500).json({ message: "Registry Error: " + error.message });
  }
};

// 2. Update Hospital Profile (Node Configuration)
exports.updateHospitalProfile = async (req, res) => {
  try {
    const { name, address, city, specialties, about, contactNumber } = req.body;

    const hospital = await Hospital.findByIdAndUpdate(
      req.user.id,
      { 
        name, 
        address, 
        city, 
        specialties, 
        about, 
        contactNumber 
      },
      { new: true, runValidators: true } 
    );

    res.json({ message: "Infrastructure Registry Updated", hospital });
  } catch (error) {
    res.status(500).json({ message: "Update Sync Failure: " + error.message });
  }
};

// 5. Get All Appointments (Integrated with Patient Metadata)
exports.getAppointments = async (req, res) => {
  try {
    const hospitalId = req.user.id || req.user._id;
    const appointments = await Appointment.find({ hospitalId })
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email phone age gender address bloodGroup")
      .sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Update Appointment Status (Decision Node)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Confirmed' or 'Rejected'
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!appointment)
      return res.status(404).json({ message: "Appointment node not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Get Patient Details (For Dashboard Overlays)
exports.getPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");
    if (!patient)
      return res.status(404).json({ message: "Patient data point missing" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8. Delete Doctor from Registry
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndDelete({
      _id: req.params.id,
      hospitalId: req.user.id,
    });
    if (!doctor)
      return res.status(404).json({ message: "Doctor record not found" });
    res.json({ message: "Doctor node de-commissioned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 9. Dashboard Analytics (Stats)
exports.getDashboardStats = async (req, res) => {
  try {
    const hospitalId = req.user.id || req.user._id;
    const [doctors, appointments] = await Promise.all([
      Doctor.countDocuments({ hospitalId }),
      Appointment.countDocuments({ hospitalId }),
    ]);
    res.json({ doctors, appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
