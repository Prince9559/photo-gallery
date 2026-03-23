const express = require("express");
const router = express.Router();
const db = require("../config/db");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");


router.post("/upload", auth, upload.single("file"), (req, res) => {
  try {

    if (!req.file) 
    {
      return res.status(400).send("No file uploaded");
    }

    const { title, category_id } = req.body;

    if (!title || !category_id) 
    {
      return res.status(400).send("All fields required");
    }

    const filename = req.file.filename;

    const sql = "INSERT INTO files (title, filename, category_id) VALUES (?, ?, ?)";

    db.query(sql, [title, filename, category_id], (err) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).send("Database Error");
      }
      res.send("File Uploaded Successfully ✅");
    });

  } catch (err) 
  {
    console.log("SERVER ERROR:", err);
    res.status(500).send("Server Error");
  }
});

router.get("/", (req, res) => {
  const sql = `
    SELECT files.*, categories.name AS category_name
    FROM files
    JOIN categories ON files.category_id = categories.id
    ORDER BY files.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).send("Database Error");
    }

    res.json(result);
  });
});

router.delete("/:id", auth, (req, res) => {
  const fileId = req.params.id;

  const sql = "DELETE FROM files WHERE id = ?";

  db.query(sql, [fileId], (err, result) => {
    if (err) {
      console.log("DELETE ERROR:", err);
      return res.status(500).send("Delete Error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("File not found");
    }

    res.send("File Deleted Successfully ✅");
  });
});

module.exports = router;