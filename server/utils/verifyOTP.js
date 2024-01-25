const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/otp");

function verifyOTPToken(req, res, next) {
  const { otp, email } = req.body;
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decode) => {
    if (err || decode.email != email || decode.otp != otp) {
      return res
        .status(403)
        .json({ msg: "Invalid OTP", error: { otp: "Invalid OTP" } });
    }
    next();
  });
}

module.exports = verifyOTPToken;
