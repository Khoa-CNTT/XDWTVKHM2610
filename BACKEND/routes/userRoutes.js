const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/get/:id", userController.getUserById);
router.post("/create", userController.createUser);
router.post("/update/:id", userController.updateUser);


module.exports = router;
