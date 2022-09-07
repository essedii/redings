import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import listingRoutes from "./routes/listings.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/listings", listingRoutes);

const CONNECTION_URL =
  // "mongodb+srv://dolci:memoriespassword123@cluster0.zf2razh.mongodb.net/?retryWrites=true&w=majority";
  "mongodb+srv://dolci:memoriespassword123@cluster0.zf2razh.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.envPORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
