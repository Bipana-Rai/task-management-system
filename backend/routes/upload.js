const express = require("express");
const router = express.Router();
const multer = require("multer");
const RegisterUserSchema = require("../models/RegisterUser");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  }, // pathko file lae ka save garne vanera destination le vanxa
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }, //aako file ko name k rakhne ,date.now chai eutae file dherae choti upload garda pno name same nahos vanera use gareko
});
const upload = multer({ storage });

router.post("/upload", upload.single("profileImage"), async (req, res) => {
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  await RegisterUserSchema.findByIdAndUpdate(req.body.id, {
    profileImage: imageUrl,
  });
  console.log(imageUrl)

  res.json({ imageUrl });
});
module.exports = router;
