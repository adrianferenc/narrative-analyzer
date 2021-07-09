const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Narrative Analyzer" });
});

router.get("/about", function (req, res) {
  res.render("about", { title: "About Narrative Analyzer" });
});

router.get("/profile", function (req, res) {
  res.render("profile", { title: "Profile" });
});

module.exports = router;
