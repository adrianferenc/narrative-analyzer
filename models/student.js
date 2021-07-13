const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    narratives: [{ type: Schema.Types.ObjectId, ref: "Narrative" }],
    categories: { type: {}, default: {} },
    grade: {
      type: String,
      enum: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"],
    },
    teacher: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
