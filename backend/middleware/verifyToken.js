const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  console.log("🔐 Incoming token:", token);
  jwt.verify(token, "hehehe", (err, decoded) => {
    if (err) {
      console.log("❌ Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    console.log("✅ Token verified. Decoded:", decoded);
    req.user = decoded;
    next();
  });
};
module.exports = verify;
