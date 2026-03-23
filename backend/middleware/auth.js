const jwt = require("jsonwebtoken");

const SECRET = "secret123";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) 
   {
    return res.status(401).send("Access Denied");
   }

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};