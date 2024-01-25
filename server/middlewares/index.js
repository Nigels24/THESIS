const multer = require("multer");
const path = require("path");
const express = require("express");
const cors = require("cors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./../uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const applyMiddlewares = (app) => {
  app.use(express.json());
  app.use(cors({ origin: true }));
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
  // Serve uploaded images as static files
  app.use("/uploads", express.static("uploads"));
};

module.exports = {
  applyMiddlewares,
  upload,
};
