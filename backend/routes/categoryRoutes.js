const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB Error");
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { name } = req.body;

  db.query("INSERT INTO categories (name) VALUES (?)", [name], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Category Added");
  });
});

module.exports = router;