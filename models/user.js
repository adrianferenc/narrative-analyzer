const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    name: {type: String},
    email: {type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
