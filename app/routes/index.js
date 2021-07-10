const express = require("express");
const router = express.Router();

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

module.exports = router;
