const { Router } = require("express");
const { db } = require("./../../configs/db");

const app = Router();

app.get("/", (req, res) => {
  const q = "SELECT * FROM eventdata";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/", (req, res) => {
  const { title, stime, sdate, ptime, pdate, description } = req.body;
  const q =
    "INSERT INTO eventdata (`title`, `stime`, `sdate`, `ptime`, `pdate`, `description`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [title, stime, sdate, ptime, pdate, description];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error creating event:", err);
      return res.status(500).json(err);
    }
    return res.json("Event has been created successfully");
  });
});

app.delete("/:id", (req, res) => {
  const eventId = req.params.id;
  const q = "DELETE FROM eventdata WHERE id = ?";

  db.query(q, [eventId], (err, data) => {
    if (err) {
      console.error("Error deleting event:", err);
      return res.status(500).json(err);
    }
    return res.json("Event has been deleted successfully");
  });
});

module.exports = {
  EventsModel: app,
};
