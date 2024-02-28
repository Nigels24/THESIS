const { Router } = require("express");
const cors = require("cors");

const { Controller } = require("./registration.controller");
const { RegistrationService } = require("./registration.service");

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
app.post("/add", Controller.Register);
app.post("/verify", Controller.verifyOtp);
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
