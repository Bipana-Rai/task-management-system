const express = require("express");
const RegisterUserSchema = require("../models/RegisterUser");
const router = express.Router();
const secret = require("../config");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//for registration
router.post("/register", async (req, res) => {
  try {
    const { fullName, password, email, role, department } = req.body;
    if (!fullName || !password || !email || !role || !department) {
      return res.status(400).json({ message: "Missing field " });
    }

    const existingUser = await RegisterUserSchema.findOne({ email }); //yo email vako user xa ki xaena vanera khojne
    if (existingUser) {
      return res.status(101).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10); // password lae hash garim

    const user = new RegisterUserSchema({
      fullName,
      email,
      password: hashPassword,
      role,
      department,
    });
    const saveData = await user.save();
    res.status(201).json({ message: " Register Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// for login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Missing fields" });
    }
    const doesExist = await RegisterUserSchema.findOne({ email }); // user le haleko email model or database ma khojeko
    if (!doesExist) {
      res.status(400).json({ message: "user not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, doesExist.password); // password compare gareko ,user le haleko password mileko chha ki chhaina
    if (!isPasswordValid) {
      res.status(400).json({ message: "Incorrect Password" });
    }
    var token = jwt.sign({ doesExist }, "hehehe");
    res.status(201).json({ message: " Login Successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/check-email", async (req, res) => {
  const { email } = req.body
  try {
    const user = await RegisterUserSchema.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Check email error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RegisterUserSchema.findById(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/getTeams", async (req, res) => {
  try {
    const teams = await RegisterUserSchema.find();
    console.log(teams)
    res.json(teams);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
