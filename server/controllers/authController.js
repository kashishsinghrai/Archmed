const Hospital = require("../models/Hospital");
const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. Register Hospital (Standard)
exports.registerHospital = async (req, res) => {
  try {
    const { name, email, password, address, licenseNumber, specialties } =
      req.body;
    if (!name || !email || !password || !address || !licenseNumber) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const hospitalExists = await Hospital.findOne({ email });
    if (hospitalExists)
      return res.status(400).json({ message: "Hospital already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const hospital = await Hospital.create({
      name,
      email,
      password: hashedPassword,
      address,
      licenseNumber,
      specialties: Array.isArray(specialties) ? specialties : [specialties],
      isApproved: "Pending",
      role: "hospital",
    });
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Login (SPY MODE 🕵️‍♂️)
exports.login = async (req, res) => {
  try {
    console.log("---------------- LOGIN DEBUG START ----------------");
    console.log("1. Full Body Received:", req.body);

    // डेटा निकालें
    let { email, password } = req.body;

    console.log(`2. Raw Email: '${email}'`);
    console.log(`3. Raw Password: '${password}'`);

    // चेक करें कि डेटा आया भी है या नहीं
    if (!email || !password) {
      console.log("❌ ERROR: Email or Password is MISSING/UNDEFINED");
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    // Trim
    email = email.trim();
    password = password.trim();

    // 🚨 PASSWORD MATCH CHECK
    const isAdminEmail = email === "admin@archmed.com";
    const isAdminPass = password === "admin123";

    console.log(`4. Is Admin Email Match? -> ${isAdminEmail}`);
    console.log(`5. Is Admin Password Match? -> ${isAdminPass}`);

    // 🅰️ ADMIN CHECK
    if (isAdminEmail && isAdminPass) {
      console.log("✅ MATCH! Creating Admin Token...");

      // Check JWT Secret
      if (!process.env.JWT_SECRET) {
        console.error("❌ FATAL: JWT_SECRET is missing in .env file!");
        return res
          .status(500)
          .json({ message: "Server Error: JWT Secret missing" });
      }

      const token = jwt.sign(
        { id: "admin", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      console.log("✅ Admin Logged In Successfully");
      console.log("---------------- LOGIN DEBUG END ----------------");

      return res.json({ token, role: "admin", name: "Super Admin" });
    }

    // 🅱️ HOSPITAL CHECK
    console.log("6. Not Admin, Checking Database for Hospital...");
    const hospital = await Hospital.findOne({ email });

    if (hospital && (await bcrypt.compare(password, hospital.password))) {
      if (hospital.isApproved !== "Approved") {
        console.log("❌ Hospital Found but Pending Approval");
        return res
          .status(401)
          .json({ message: "Your account is pending Admin approval." });
      }
      const token = jwt.sign(
        { id: hospital._id, role: "hospital" },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      );
      console.log("✅ Hospital Logged In");
      return res.json({
        token,
        role: "hospital",
        id: hospital._id,
        name: hospital.name,
      });
    }

    console.log("❌ LOGIN FAILED: No match found.");
    console.log("---------------- LOGIN DEBUG END ----------------");
    res.status(401).json({ message: "Invalid Credentials" });
  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// 3. Register Patient
exports.registerPatient = async (req, res) => {
    try {
        const { name, email, password, phone, age, gender, address } = req.body;

        // Check duplicate
        const patientExists = await Patient.findOne({ email });
        if (patientExists) return res.status(400).json({ message: 'Patient already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create Patient
        const patient = await Patient.create({
            name, email, password: hashedPassword, phone, age, gender, address
        });

        res.status(201).json({ message: 'Patient Registered Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Login Patient
// 4. Login Patient (SPY MODE 🕵️‍♂️)
exports.loginPatient = async (req, res) => {
    try {
        console.log("---------------- PATIENT LOGIN DEBUG ----------------");
        const { email, password } = req.body;
        console.log(`1. Trying to login with Email: '${email}'`);

        const patient = await Patient.findOne({ email });

        if (!patient) {
            console.log("❌ ERROR: Patient not found in Database with this email");
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log("2. Patient Found! Comparing Passwords...");
        
        // Bcrypt compare check
        const isMatch = await bcrypt.compare(password, patient.password);
        console.log(`3. Password Match Result: ${isMatch}`);

        if (isMatch) {
            const token = jwt.sign(
                { id: patient._id, role: 'patient' }, 
                process.env.JWT_SECRET, 
                { expiresIn: '30d' }
            );

            console.log("✅ SUCCESS: Login successful for:", patient.name);
            console.log("-----------------------------------------------------");

            res.json({
                token,
                role: 'patient',
                id: patient._id,
                name: patient.name,
                email: patient.email
            });
        } else {
            console.log("❌ ERROR: Password does not match hashed version");
            console.log("-----------------------------------------------------");
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("❌ SERVER ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};