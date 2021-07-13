const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new mongoose.Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student" },
    studentName: { type: String, required: true },
    narrativeText: { type: String, required: true },
    narrativeId: { type: Schema.Types.ObjectId, ref: "Narrative" },
    assignedCategories: { type: Object, default: {} },
    wordCharmap: { type: Object },
    wordCount: { type: Number },
    sentenceCount: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
