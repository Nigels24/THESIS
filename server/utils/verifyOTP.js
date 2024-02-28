const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/otp");

function verifyOTPToken(req, res, next) {
  const { otp, email } = req.body;
  const authHeader = req.headers["authorization"];

  // Check if Authorization header exists
  if (!authHeader)
    return res.status(401).json({ error: "Authorization header missing" });

  // Split the header to get the token
  const token = authHeader.split(" ")[1];

  // Verify the token
  jwt.verify(token, SECRET, (err, decode) => {
    if (err || decode.email !== email || decode.otp !== otp) {
      return res.status(403).json({ error: "Invalid OTP" });
    }

    // If token is valid and OTP matches, proceed to next middleware
    next();
  });
}

module.exports = verifyOTPToken;
