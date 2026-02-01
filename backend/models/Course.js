import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    teacherName: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
