const { Router } = require("express");
const cors = require("cors");

const { Controller } = require("./registration.controller");
const { RegistrationService } = require("./registration.service");
const verifyOTP = require("../../utils/verifyOTP");

const app = Router();

app.use(cors());

app.put(
  "/:id",
  function (req, _, next) {
    req.params.id = parseInt(req.params.id);

    next();
  },
  Controller.Update
);
app.post("/", verifyOTP, Controller.Register);
app.get("/", async (_, res) => {
  try {
    const registrations = await RegistrationService.getAllRegistrations();
    res.json(registrations);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

app.post("/otp", Controller.Otp);

module.exports = {
  RegistrationModel: app,
};
