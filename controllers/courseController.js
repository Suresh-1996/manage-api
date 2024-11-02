const Course = require("../models/Course");
const EnrolledCourse = require("../models/EnrolledCourse");

exports.addCourse = async (req, res) => {
  const { courseName, description } = req.body;
  try {
    console.log("Teacher ID from req.user:", req.user);
    const course = new Course({
      courseName,
      description,
      teacherId: req.user,
    });
    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Error adding course:", error); // Log error details
    res.status(500).json({ message: "Server error" });
  }
};

exports.enrollCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    console.log("Student ID:", req.user);

    // Check if the enrollment already exists
    const existingEnrollment = await EnrolledCourse.findOne({
      courseId,
      studentId: req.user,
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    // Create a new enrollment if not already enrolled
    const enrolledCourse = new EnrolledCourse({
      courseId,
      studentId: req.user,
    });

    await enrolledCourse.save();
    res.status(201).json({
      message: "Course enrolled successfully",
      enrolledCourse,
    });
  } catch (error) {
    console.error("Error enrolling course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    // Get the list of courses the student is already enrolled in
    const enrolledCourses = await EnrolledCourse.find({
      studentId: req.user,
    }).select("courseId");
    const enrolledCourseIds = enrolledCourses.map(
      (enrollment) => enrollment.courseId
    );

    // Find all courses that the student is NOT enrolled in
    const courses = await Course.find({
      _id: { $nin: enrolledCourseIds },
    }).populate("teacherId", "name email profilePicture"); // Populate teacher details

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEnrolledCoursesByStudentId = async (req, res) => {
  try {
    // Find all EnrolledCourse documents for the logged-in student
    const enrolledCourses = await EnrolledCourse.find({
      studentId: req.user,
    }).populate({
      path: "courseId",
      populate: {
        path: "teacherId", // Populate teacher details within each course
        select: "name email profilePicture",
      },
    });

    // Map enrolledCourses to extract detailed course data with teacher info
    const courses = enrolledCourses.map((enrollment) => enrollment.courseId);

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCoursesByTeacherId = async (req, res) => {
  console.log("getcourse by teacher id :", req.user);
  try {
    const courses = await Course.find({ teacherId: req.user }).populate(
      "teacherId",
      "name email profilePicture"
    );
    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses found for this teacher" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.unenrollCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find and delete the enrollment for the logged-in student and specific course
    const unenrolled = await EnrolledCourse.findOneAndDelete({
      studentId: req.user, // Set by auth middleware
      courseId: courseId,
    });

    if (!unenrolled) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({ message: "Unenrolled successfully" });
  } catch (error) {
    console.error("Error unenrolling course:", error);
    res.status(500).json({ message: "Server error" });
  }
};
