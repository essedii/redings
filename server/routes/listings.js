const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listingsController");
const verifyUser = require("../middleware/verifyUser");

router.get("/", listingsController.getListings);
router.post("/create", verifyUser, listingsController.createListing);
router.get("/:id", listingsController.getListing);
router.delete("/:id", verifyUser, listingsController.deleteListing);
router.patch("/:id", verifyUser, listingsController.updateListing);

module.exports = router;



