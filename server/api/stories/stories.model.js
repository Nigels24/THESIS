const { Router } = require("express");
const { db } = require("./../../configs/db");
const { upload } = require("./../../middlewares");
const { Prisma } = require("@prisma/client");

const app = Router();

app.post("/add", upload.single("image"), (req, res) => {
  const title = req.body.title;
  const img = req.file ? req.file.filename : null; // Change 'image' to 'img'
  const desc = req.body.desc;

  const sqlInsert = "INSERT INTO stories (title, img, `desc`) VALUES (?, ?, ?)"; // Update the column order

  db.query(sqlInsert, [title, img, desc], (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("Request failed, error inserting data into the database.");
    } else {
      const imageUrl = `/uploads/${img}`; // Create the image URL
      res.status(200).json({ imageUrl }); // Send the URL back to the frontend
    }
  });
});

app.get("/", (req, res) => {
  const q = "SELECT * FROM stories";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching stories :", err);
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

module.exports = {
  StoriesModel: app,
};
