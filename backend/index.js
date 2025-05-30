require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const taskRoute = require("./routes/taskRoute");
const authRoute = require("./routes/authRoute");
const varify = require("./routes/varify");
const upload = require("./routes/upload");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb+srv://bipanarai:Bipana123@cluster0.rnhqnoe.mongodb.net/taskmaze", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.log("error", error);
  });
app.use("/api", taskRoute);
app.use("/", authRoute);
app.use("/", varify);
app.use("/", upload);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log("server connected");
});
