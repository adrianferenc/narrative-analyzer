const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    narratives: [{ type: Schema.Types.ObjectId, ref: "Narrative" }],
    categories: { type: Object, default: {} },
    teacher: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
