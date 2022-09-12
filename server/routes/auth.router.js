const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

router.post("/signup", authController.create);
router.post("/login", authController.authenticate);
router.delete("/:id", authController._delete);
// TODO CURRENT
// router.post("/current", authController.getCurrent);

router.get("/", authController.getAll);
router.get("/:id", authController.getById);
router.put("/:id", authController.update);

module.exports = router;
