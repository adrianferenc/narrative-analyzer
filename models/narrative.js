const mongoose = require("mongoose");

const narrativeSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    creator: { type: String, required: true },
    categories: []
  },
  { timestamps: true }
);

module.exports = mongoose.model("Narrative", narrativeSchema);
