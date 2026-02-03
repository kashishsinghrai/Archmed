const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  // 1. Check for Token in Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get token from header
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Attach user to request object (CRITICAL FIX)
      // We explicitly map 'id' to handle cases where token has '_id' or 'id'
      req.user = {
        id: decoded.id || decoded._id,
        role: decoded.role,
        email: decoded.email,
      };

      console.log("🔹 Middleware User Attached:", req.user); // Debugging Log

      next();
    } catch (error) {
      console.error("❌ Token Verification Error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, adminOnly };
