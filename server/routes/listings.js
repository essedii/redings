import express from "express";

import {
  getListings,
  getListing,
  createListing,
} from "../controllers/listings.js";

const router = express.Router();

router.get("/", getListings);
router.get("/", createListing);
router.get("/:id", getListing);

export default router;
