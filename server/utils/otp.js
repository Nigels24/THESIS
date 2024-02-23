const { config } = require("dotenv");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

config();

function generateOTP(length) {
  const buffer = crypto.randomBytes(length);
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += buffer.readUInt8(i) % 10;
  }

  return otp;
}

const SECRET = process.env.OTP_SECRET;
const PASSWORD = "unyu pykr eqki cvdc";
const EMAIL = "bscsalumnitracking@gmail.com";

function setTransporter(email, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  return transporter;
}

function setMailOptions(title, generatedOTP, to_email, from_email, subject) {
  const mailOptions = {
    from: {
      name: title,
      address: from_email,
    },
    to: to_email,
    subject: subject,
    html: `
      <p>Dear User,</p>
      <p>Please find below your One-Time Password (OTP) for BSCS ALUMNI TRACKING SYSTEM:</p>
      <p><strong>OTP:</strong> ${generatedOTP}</p>
      <p>This OTP will expire in 5 minutes. Please do not share it with anyone.</p>
      <p>Best regards,<br>${title}</p>
    `,
  };
  return mailOptions;
}

module.exports = {
  EMAIL,
  SECRET,
  generateOTP,
  PASSWORD,
  setTransporter,
  setMailOptions,
};
