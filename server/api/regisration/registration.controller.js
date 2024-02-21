const { hashPassword } = require("./../../utils/password");
const { RegistrationService } = require("./registration.service");

const { REGISTER, UPDATE } = RegistrationService;
const {
  PASSWORD,
  SECRET,
  generateOTP,
  setMailOptions,
  setTransporter,
  EMAIL,
} = require("../../utils/otp.js");

const jwt = require("jsonwebtoken");

const Controller = {
  Register: async (req, res) => {
    try {
      const { password, ...payload } = req.body;
      const avatar = req?.file?.filename;

      if (!password) throw new Error("Password is required.");

      const hashedPassword = await hashPassword(password);

      const { accessToken } = await REGISTER({
        ...payload,
        hashedPassword,
        avatar,
      });

      res.json({
        accessToken,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
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
      res.sendStatus(500);
    }
  },

  Otp: async (req, res) => {
    const { email } = req.body;

    try {
      const GENOTP = generateOTP(5);
      console.log(GENOTP);
      console.log(email);
      const OTP_KEY = jwt.sign({ email: email, otp: GENOTP }, SECRET, {
        expiresIn: "5m",
      });

      const transporter = setTransporter(EMAIL, PASSWORD);
      const mailOptions = setMailOptions(
        "ALUMNI TRACKING SYSTEM",
        GENOTP,
        email,
        EMAIL,
        "no reply"
      );

      const info = await transporter.sendMail(mailOptions);

      if (info.messageId) {
        res.json({
          message: "Please check email LOL!",
          key: OTP_KEY,
        });
      } else {
        res.sendStatus(422);
      }
    } catch (e) {
      res.json({
        message: `Ops error: ${e}`,
      });
    }
  },
};

module.exports = {
  Controller,
};
