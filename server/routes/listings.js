const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listingsController");
// const verifyUser = require("../middleware/verifyJWT");

router.get("/",  listingsController.getListings);
router.post("/create",   listingsController.createListing);
router.get("/:id",   listingsController.getListing);
router.delete("/:id",   listingsController.deleteListing);
router.patch("/:id",   listingsController.updateListing);

module.exports = router;
