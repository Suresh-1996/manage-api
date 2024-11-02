// controllers/teacherController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");

exports.registerTeacher = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if teacher exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher)
      return res.status(400).json({ message: "Teacher already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create teacher with profile picture if uploaded
    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      profilePicture: req.file ? req.file.path : null,
    });
    await teacher.save();

    // Generate token
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ user: teacher, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginTeacher = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ message: "Teacher not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ user: teacher, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
