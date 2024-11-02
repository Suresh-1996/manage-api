// routes/teacherRoutes.js
const express = require("express");
const {
  getAllCourses,
  getCoursesByTeacherId,
  addCourse,
  deleteCourse,
  enrollCourse,
  getEnrolledCoursesByStudentId,
  unenrollCourse,
} = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Course routes
router.post("/addCourse", authMiddleware, addCourse); // Add a new course
router.get("/", authMiddleware, getAllCourses); // Get all courses
router.get("/teacherId", authMiddleware, getCoursesByTeacherId); // Get courses for a specific teacher
router.delete("/:id", authMiddleware, deleteCourse); // Requires authentication
router.post("/enroll/:courseId", authMiddleware, enrollCourse); // Requires authentication
router.delete("/unenroll/:courseId", authMiddleware, unenrollCourse); // Requires authentication
router.get("/enrolled", authMiddleware, getEnrolledCoursesByStudentId); // Requires authentication

module.exports = router;
