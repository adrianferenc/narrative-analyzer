const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const narrativeSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: "Student" },
    teacher: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Narrative", narrativeSchema);
