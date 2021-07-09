const express = require("express");
const router = express.Router();
const narrativesCtrl = require("../controllers/narratives");

router.get("/", narrativesCtrl.index);
router.get("/new", narrativesCtrl.new);
router.post("/", narrativesCtrl.create);
router.get("/:id", narrativesCtrl.revise);
router.put("/:id", narrativesCtrl.update);
router.delete("/:id",narrativesCtrl.delete);

module.exports = router;
