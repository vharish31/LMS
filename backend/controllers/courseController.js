import Course from "../models/Course.js";

// GET all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE course (with input validation)
export const createCourse = async (req, res) => {
  const { title, description, link, teacherName } = req.body;
  if (!title?.trim() || !description?.trim() || !link?.trim() || !teacherName?.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const course = new Course({ title, description, link, teacherName });
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE course
export const updateCourse = async (req, res) => {
  const { title, description, link, teacherName } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, link, teacherName },
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
