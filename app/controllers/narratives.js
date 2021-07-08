const Student = require("../models/student");
const Narrative = require("../models/narrative");
const Category = require("../models/category");

module.exports = {
  index,
  new: newNarrative,
  create,
};

function index(req, res) {
  res.render("narratives/index.ejs", { title: "Narratives" });
}

function newNarrative(req, res) {
  res.render("narratives/new.ejs", { title: "Add a Narrative" });
}

function create(req, res) {
    console.log(req.body);
  res.redirect("/narratives");
}
