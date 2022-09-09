import express from "express";

import {
  getListings,
  updateListing,
  getListing,
  createListing,
} from "../controllers/listings.js";

const router = express.Router();

router.get("/", getListings);
router.post("/", createListing);
router.patch("/:id", updateListing);
router.get("/:id", getListing);

export default router;
