const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listingsController");

router.get("/", listingsController.getListings);

router.post("/create", listingsController.create);
router.get("/:id", listingsController.getListing);
router.delete("/:id", listingsController._delete);
router.patch("/:id", listingsController.update);

module.exports = router;
