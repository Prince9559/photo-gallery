const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "secret123";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO admins (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Admin Registered");
    }
  );
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admins WHERE email=?", [email], async (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      return res.status(400).send("User not found");
    }

    const admin = result[0];

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).send("Wrong password");
    }

    const token = jwt.sign({ id: admin.id }, SECRET, { expiresIn: "1d" });

    res.json({ token });
  });
});

module.exports = router;