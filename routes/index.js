const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Narrative = require("../models/narrative");
const Category = require("../models/category");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Narrative Analyzer", navKey: "home" });
});

router.get("/about", function (req, res) {
  res.render("about", { title: "About Narrative Analyzer", navKey: "about" });
});

router.get("/profile", function (req, res) {
  res.render("profile", { title: "Profile", navKey: "profile" });
});

router.get("/search", async function (req, res) {
  const query = req.url.slice(15).toLowerCase().replace(/\++/gm, " ");
  const foundStudents = await Student.find({
    name: { $regex: query, $options: "i" },
  });

  const foundNarratives = await Narrative.find({
    text: { $regex: query, $options: "i" },
  });

  const foundNarrativeNames = {};

  for (narrative of foundNarratives) {
    let thisStudent = await Student.findById(narrative.student);
    foundNarrativeNames[narrative.student] = thisStudent.name;
  }

  res.render("search.ejs", {
    title: "Search Results",
    navKey: "search",
    query,
    foundStudents,
    foundNarratives,
    foundNarrativeNames,
  });
});

module.exports = router;
