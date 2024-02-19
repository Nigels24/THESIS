const { Router } = require("express");
const { db } = require("../../configs/db");

const app = Router();

app.get("/", (req, res) => {
  const q = "SELECT * FROM registration";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { lname, fname, mname, yeargrad } = req.body;

  const q =
    "UPDATE registration SET lname = ?, fname = ?, mname = ?, yeargrad = ? WHERE id = ?";
  const values = [lname, fname, mname, yeargrad, id];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error updating event:", err);
      return res.status(500).json(err);
    }
    return res.json("Event has been updated successfully");
  });
});

app.post("/", (req, res) => {
  const { lname, fname, mname, yeargrad } = req.body;
  const q =
    "INSERT INTO registration (lname, fname, mname, yeargrad) VALUES (?, ?, ?, ?)";
  const values = [lname, fname, mname, yeargrad];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error creating event:", err);
      return res.status(500).json(err);
    }
    return res.json("Event has been created successfully");
  });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM registration WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Error deleting event:", err);
      return res.status(500).json(err);
    }
    return res.json("Event has been deleted successfully");
  });
});
module.exports = {
  AlumniModel: app,
};
