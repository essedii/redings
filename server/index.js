require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

const authRoutes = require("./routes/auth.router");
const listingsRoutes = require("./routes/listings.router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/listings", listingsRoutes);

const CONNECTION_URL =
  "mongodb+srv://dolci:memoriespassword123@cluster0.zf2razh.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
