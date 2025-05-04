const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const RegisterUserSchema = require("../models/RegisterUser");
router.get("/verify",async (req, res) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      return res.status(401).send("No token provided");
    }
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, "hehehe",async (err, decoded) => {
      if (err) {
        return res. status(401).json({ message: "Invalid and expire token" });
      }
     
      
      // console.log(decoded)
      
      res.status(200).json({ message: "Token is valid", user:decoded });
    });
  } catch (error) {
    res.json({ error:error });
  }
});
module.exports = router;
