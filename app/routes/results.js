const express = require("express");
const router = express.Router();
const resultsCtrl = require("../controllers/results");

router.get("/", resultsCtrl.index);
router.post("/",resultsCtrl.analyze)
router.get("/:id", resultsCtrl.show);

module.exports = router;
