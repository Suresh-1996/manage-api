Project Title
Backend for Student Management System

Project Description
The backend for the Student Management System is a RESTful API designed to support both the teacher and student portals. Built with Node.js, Express, and MongoDB, it provides endpoints for user authentication, course management, and enrollment processing. JWT-based authentication ensures secure access to resources, and Multer is used for profile picture uploads.

Features
Authentication: Secure JWT-based login and signup for teachers and students.
Course Management: Endpoints for managing courses, including adding, viewing, and deleting.
Enrollment: Endpoints for enrolling and unenrolling students from courses.
Profile Picture Uploads: Handles profile picture uploads using Multer.

Technologies
Backend: Node.js, Express.js, MongoDB
Authentication: JWT
File Uploads: Multer

Installation
Clone the repository:
git clone <repository-url>
cd student-management-backend

Install dependencies:
npm install
Configure environment variables in a .env file:
MONGO_URI - MongoDB connection URI
JWT_SECRET - Secret key for JWT
Other necessary configurations as per your setup

Start the server:
node server.js
API Endpoints
Endpoint Method Description
/api/teachers/signup POST Signup for teachers
/api/teachers/signin POST Login for teachers
/api/students/signup POST Signup for students
/api/students/signin POST Login for students

/api/courses/addCourse POST Add course by teacher
/api/courses GET Fetch all courses
/api/courses/teacherId GET Fetch courses by teacher id
/api/courses/id delete courses by teacher
/api/courses/unenroll/:courseId DELETE Unenroll a student from a course
/api/courses/enroll/:courseId POST Enroll a student in a course  
/api/courses/enrolled GET Enrolled courses by student id

Usage
Run the backend server, connect with the frontend portals, and access the API via client requests.
