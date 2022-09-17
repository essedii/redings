const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUser);
router.delete("/:id", usersController.deleteUser);


module.exports = router;
