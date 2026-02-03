const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Hospital = require("../models/Hospital");

exports.searchHospitals = async (req, res) => {
  try {
    const { city, specialty } = req.query;
    // केवल "Approved" अस्पतालों को दिखाएं
    let query = { isApproved: "Approved" };

    // City Filter फिक्स: पक्का करें कि यह 'city' फ़ील्ड पर ही सर्च करे
    if (city && city.trim() !== "") {
      query.city = { $regex: city, $options: "i" };
    }

    // Specialty Filter
    if (specialty && specialty.trim() !== "") {
      query.specialties = { $in: [new RegExp(specialty, "i")] };
    }

    const hospitals = await Hospital.find(query)
      .select("-password")
      .sort({ name: 1 });
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Discovery Error: " + error.message });
  }
};

// 2. Get Single Hospital Details & its Doctors
exports.getHospitalDetails = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).select("-password");

    if (!hospital) {
      return res.status(404).json({ message: "Hospital node not found" });
    }

    // उस अस्पताल से जुड़े सभी उपलब्ध डॉक्टरों को लाएं
    const doctors = await Doctor.find({
      hospitalId: req.params.id,
      isAvailable: true,
    });

    res.json({ ...hospital._doc, doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Search Doctors (Cross-Network Search)
exports.searchDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let searchOptions = { isAvailable: true };

    if (query && query.trim() !== "") {
      searchOptions.$or = [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ];
    }

    const doctors = await Doctor.find(searchOptions)
      .populate("hospitalId", "name address city")
      .sort({ createdAt: -1 });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Book Appointment (Authenticated Node Sync)
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, hospitalId, date } = req.body;
    const patientId = req.user.id;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient record not found" });
    }

    if (!doctorId || !hospitalId || !date) {
      return res
        .status(400)
        .json({ message: "Missing required booking details" });
    }

    const newAppointment = await Appointment.create({
      doctorId,
      hospitalId,
      patientId,
      patientName: patient.name,
      patientPhone: patient.phone,
      date,
      status: "Pending",
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Booking Error: " + error.message });
  }
};

// 5. Get Patient's Appointment History
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id })
      .populate("doctorId", "name specialization fees")
      .populate("hospitalId", "name address city")
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Get Patient Profile
exports.getProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient node not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Update Patient Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, age, gender, address, bloodGroup } = req.body;
    const patient = await Patient.findById(req.user.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Update fields
    patient.name = name || patient.name;
    patient.phone = phone || patient.phone;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    patient.address = address || patient.address;
    if (bloodGroup) patient.bloodGroup = bloodGroup;

    const updatedPatient = await patient.save();

    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      email: updatedPatient.email,
      role: "patient",
      // अन्य डेटा भी भेजें ताकि Frontend State अपडेट हो सके
      phone: updatedPatient.phone,
      age: updatedPatient.age,
      gender: updatedPatient.gender,
      bloodGroup: updatedPatient.bloodGroup,
      address: updatedPatient.address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
