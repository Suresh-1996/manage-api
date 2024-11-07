const express = require("express");
const {
  registerTeacher,
  loginTeacher,
} = require("../controllers/teacherController");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();
// Assigning functions to route
router.post("/signup", upload.single("profilePicture"), registerTeacher);
router.post("/signin", loginTeacher);

module.exports = router;
