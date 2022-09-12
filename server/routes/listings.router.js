const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listings.controller.js");

router.get("/:id", listingsController.getListing);
router.delete("/:id", listingsController._delete);
router.post("/create", listingsController.create);
router.put("/:id", listingsController.update);
router.get("/", listingsController.getListings);

module.exports = router;
