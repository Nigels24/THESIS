const { Router } = require("express");
const { db } = require("./../../configs/db");
const { upload } = require("./../../middlewares");
const { Prisma } = require("@prisma/client");

const app = Router();

app.get("/", (req, res) => {
  const q = "SELECT * FROM joboppdata";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching job :", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/add", upload.single("image"), (req, res) => {
  const title = req.body.title;
  const ptime = req.body.ptime;
  const pdate = req.body.pdate;
  const description = req.body.description;
  const link = req.body.link;
  const img = req.file ? req.file.filename : null; // Change 'image' to 'img'

  const status = false; // Set the default status to 'false'
  const sqlInsert =
    "INSERT INTO joboppdata (title, ptime, pdate, description, link, status, img) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sqlInsert,
    [title, ptime, pdate, description, link, status, img],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Request failed, error inserting data into the database.");
      } else {
        const imageUrl = `/uploads/${img}`; // Create the image URL

        res.status(200).json({ imageUrl }); // Send the URL back to the frontend
      }
    }
  );
});
app.post("/adminjob", upload.single("image"), (req, res) => {
  const title = req.body.title;
  const ptime = req.body.ptime;
  const pdate = req.body.pdate;
  const description = req.body.description;
  const link = req.body.link;
  const img = req.file ? req.file.filename : null; // Change 'image' to 'img'

  const status = true; // Set the default status to 'false'
  const sqlInsert =
    "INSERT INTO joboppdata (title, ptime, pdate, description, link, status, img) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sqlInsert,
    [title, ptime, pdate, description, link, status, img],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Request failed, error inserting data into the database.");
      } else {
        const imageUrl = `/uploads/${img}`; // Create the image URL

        res.status(200).json({ imageUrl }); // Send the URL back to the frontend
      }
    }
  );
});

app.get("/alumnijob", (req, res) => {
  const q = "SELECT * FROM joboppdata WHERE status = true";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching job opportunities:", err);
      return res.status(500).json(err);
    }

    return res.json(
      data.map((value) => ({
        ...value,
        imagePath: `/uploads/${value.img}`,
      }))
    );
  });
});
app.delete("/:id", (req, res) => {
  const jobId = req.params.id;
  const q = "DELETE FROM joboppdata WHERE id = ?";

  db.query(q, [jobId], (err, data) => {
    if (err) {
      console.error("Error deleting event:", err);
      return res.status(500).json(err);
    }
    return res.json("Event has been deleted successfully");
  });
});

app.get("/falsejob", (req, res) => {
  const q = "SELECT * FROM joboppdata WHERE status = false";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching job opportunities:", err);
      return res.status(500).json(err);
    }

    return res.json(
      data.map((value) => ({
        ...value,
        imagePath: `/uploads/${value.img}`,
      }))
    );
  });
});
app.put("/:id/jobstatus", (req, res) => {
  const id = req.params.id; // Assuming you have a unique identifier for each job, e.g., job ID
  const { status } = req.body;

  const q = "UPDATE joboppdata SET `status` = ? WHERE id = ?"; // Update the status for a specific job by its unique identifier
  db.query(q, [status, id], (err, data) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json(err);
    }
    return res.json("Status updated successfully");
  });
});
app.put("/jobopp/:id/status", (req, res) => {
  const id = req.params.id; // Assuming you have a unique identifier for each job, e.g., job ID

  const q = "UPDATE joboppdata SET `status` = ? WHERE id = ?"; // Update the status for a specific job by its unique identifier
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json(err);
    }
    return res.json("Status updated successfully");
  });
});

module.exports = {
  JobOpportunitiesModel: app,
};
