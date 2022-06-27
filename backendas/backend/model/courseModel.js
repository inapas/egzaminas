const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category:{
      type: String,
      required: true,
      ref: "Category",
    },
    courseName: {
      type: String,
      maxLength: [48, "course name is to long"],
      required: [true, "Please write course name"],
    },
    courseDescription: {
      type: String,
      maxLength: [100, "Course description is too long"],
      required: [true, "Please write course description"],
    },
    coursePhoto: {
      type: String,
      required: [true, "Please provide a link to a photo"],
    }
  },
  {
    timestamp: true,
  },
);

module.exports = mongoose.model("Course", courseSchema);