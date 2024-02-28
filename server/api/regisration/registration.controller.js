const { hashPassword } = require("./../../utils/password");
const { RegistrationService } = require("./registration.service");
const bcrypt = require("bcrypt");
const {
  REGISTER,
  UPDATE,
  getUserEmail,
  postOtp,
  deleteOtp,
  updateStatus,
  getOtpByEmail,
  deleteUnverified,
} = RegistrationService;
const {
  SECRET,
  generateOTP,
  setMailOptions,
  sendEmail,
} = require("../../utils/otp.js");

const jwt = require("jsonwebtoken");

const Controller = {
  Register: async (req, res) => {
    try {
      const password = req.body.password; // Accessing password directly from req.body
      const payload = { ...req.body }; // Making a copy of req.body

      await deleteUnverified(payload.email);
      // Check if email already exists and is verified
      const registrations = await getUserEmail(payload.email);
      // console.log(registrations);
      const existingUser = registrations.find(
        (user) => user.status === "verified"
      );

      if (existingUser) {
        throw new Error("Email already exists and is verified.");
      }

      if (!password) throw new Error("Password is required.");

      const hashedPassword = await hashPassword(password);

      const { accessToken } = await REGISTER({
        ...payload,
        hashedPassword,
        avatar: req?.file?.filename,
      });
      // Send response to the client
      res.json({
        message: `OTP has been sent to ${payload.email}`,
        accessToken,
      });

      // Now you can use payload.email if needed

      // Call Otp method with email
      await Controller.Otp(payload.email, res); // Pass res as a parameter
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message }); // Send error message in response
    }
  },

  Update: async (req, res) => {
    try {
      const { id } = req.params;
      const avatar = req?.file?.filename;
      const {
        mobileNumber,
        currentAddress,
        employment_status,
        current_job,
        year_current_job,
        position_current_job,
        employment_type,
        place_current_job,
        furtherStudies,
        enrollFurtherStudies,
        eligibility,
      } = req.body;

      const { accessToken } = await UPDATE({
        mobileNumber,
        currentAddress,
        avatar,
        employment_status,
        current_job,
        year_current_job,
        position_current_job,
        employment_type,
        place_current_job,
        furtherStudies,
        enrollFurtherStudies,
        eligibility,
        id,
      });
      res.json({
        accessToken,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message }); // Send error message in response
    }
  },

  Otp: async (email, res) => {
    // Add res as a parameter
    try {
      const GENOTP = generateOTP(5);
      console.log(GENOTP);
      console.log(email);
      await deleteOtp(email);
      const hashedOTP = await hashPassword(GENOTP);
      // Get current timestamp and expiry timestamp for OTP
      const createdAt = new Date().toISOString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // Expires in 5 minutes

      // Call postOtp function to insert OTP data
      await postOtp(email, hashedOTP, createdAt, expiresAt);

      const butterfly = jwt.sign({ email: email, otp: GENOTP }, SECRET, {
        expiresIn: "5m",
      });

      const mailOptions = setMailOptions(
        "ALUMNI TRACKING SYSTEM",
        GENOTP,
        email,
        "no reply"
      );

      await sendEmail(mailOptions);

      // Send response to the client only if it hasn't been sent already
      if (!res.headersSent) {
        res.json({
          message: "Please check email LOL!",
          key: butterfly,
        });
      }
    } catch (e) {
      // Send error message in response
      res.status(500).json({ error: `Ops error: ${e.message}` });
    }
  },
  verifyOtp: async (req, res) => {
    const { email, otp } = req.body;

    try {
      // Retrieve OTP data from the database based on the provided email
      const otpData = await getOtpByEmail(email);

      // Check if OTP data exists for the provided email
      if (!otpData) {
        return res
          .status(400)
          .json({ error: "OTP data not found for the provided email" });
      }

      // Compare the provided OTP with the stored hashed OTP
      const isMatch = await bcrypt.compare(otp, otpData.otp);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      // Check if the OTP has expired
      const currentTime = new Date();
      const expiresAt = new Date(otpData.expiresAt);
      if (currentTime > expiresAt) {
        return res.status(400).json({ error: "OTP has expired" });
      }

      // Update the status to 'verified'
      await updateStatus(email);

      // If all checks pass, the OTP is verified
      res.json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = {
  Controller,
};
