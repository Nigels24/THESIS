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

const SECRET = "butterlfy";

let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "bscsalumnitracking@gmail.com",
    pass: "gtznnwnvmeyuedoo",
  },
});

// test transporter b4 nimu e start ilisi ang baseurl sa localhost
transporter.verify((error, success) => {
  if (error) {
    console.log("Email:", error);
  } else {
    console.log("Server is ready to take messages");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

function setMailOptions(
  title,
  generatedOTP,
  to_email,
  subject,
  from_email = process.env.AUTH_EMAIL
) {
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
  SECRET,
  generateOTP,
  setMailOptions,
  sendEmail,
};
