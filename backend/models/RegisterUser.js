const mongoose = require("mongoose");
const Register = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  profileImage: String,
});
const RegisterUserSchema = mongoose.model("users", Register);
module.exports = RegisterUserSchema;
