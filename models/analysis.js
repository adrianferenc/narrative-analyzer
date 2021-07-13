const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnalysisSchema = new mongoose.Schema(
  {
    dimensions: String,
    subcategories: [],
    sentenceMean: Number,
    sentenceMedian: Number,
    wordMean: Number,
    wordMedian: Number,
    wordCharmap: Object
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", AnalysisSchema);
