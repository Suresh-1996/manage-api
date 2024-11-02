const mongoose = require("mongoose");

const enrolledCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("EnrolledCourse", enrolledCourseSchema);
module.exports = Course;
