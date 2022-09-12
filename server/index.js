require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

const authRoutes = require("./routes/auth.router");

// const jwt = require("_helpers/jwt");
// const errorHandler = require("_helpers/error-handler");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());

// api routes
app.use("/auth", authRoutes);

// global error handler
// app.use(errorHandler);

// start server
const CONNECTION_URL =
  "mongodb+srv://dolci:memoriespassword123@cluster0.zf2razh.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
