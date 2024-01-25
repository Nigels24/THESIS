const { Router } = require("express");
const { db } = require("./../../configs/db");
const { upload } = require("./../../middlewares");
const { Prisma } = require("@prisma/client");

const app = Router();

app.get("/", (req, res) => {
  const q = "SELECT * FROM newsdata";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching stories :", err);
      return res.status(500).json(err);
    }

    return res.json(
      data.map((value) => ({
        ...value,
        imagePath: `http://localhost:3001/uploads/${value.img}`,
      }))
    );
  });
});

app.post("/", upload.single("image"), (req, res) => {
  console.log("file", req.file);
  const title = req.body.title;
  const ptime = req.body.ptime;
  const pdate = req.body.pdate;
  const description = req.body.description;
  const img = req.file ? req.file.filename : null; // Change 'image' to 'img'

  const sqlInsert =
    "INSERT INTO newsdata (title, ptime, pdate, description, img) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sqlInsert,
    [title, ptime, pdate, description, img],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Request failed, error inserting data into the database.");
      } else {
        const imageUrl = `http://localhost:3001/uploads/${img}`; // Create the image URL

        res.status(200).json({ imageUrl }); // Send the URL back to the frontend
      }
    }
  );
});

app.delete("/:id", (req, res) => {
  const newsId = req.params.id;
  const q = "DELETE FROM newsdata WHERE id = ?";

  db.query(q, [newsId], (err, data) => {
    if (err) {
      console.error("Error deleting news:", err);
      return res.status(500).json(err);
    }
    return res.json("News has been deleted successfully");
  });
});

module.exports = {
  NewsModel: app,
};
