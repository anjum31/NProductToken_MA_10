const express = require("express");
const jwt = require("jsonwebtoken");
const router = require("./src/routes/productroutes");
const app = new express();
const mongoose = require("mongoose");

// Security Package import

const bodyParser = require("body-parser");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connectToDatabase() {
  try {
    const URI = "mongodb://127.0.0.1:27017/schools";
    const OPTIONS = { user: "", pass: "" };
    await mongoose.connect(URI, OPTIONS);
    console.log("Databse Connection is successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Notfound" });
});

module.exports = app;
