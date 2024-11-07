const express = require("express");
const {
  registerStudent,
  loginStudent,
} = require("../controllers/studentController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Register student with  profile picture
router.post("/signup", upload.single("profilePicture"), registerStudent);

// Login student
router.post("/signin", loginStudent);

module.exports = router;
