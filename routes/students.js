const express = require("express");
const router = express.Router();
const studentsCtrl = require("../controllers/students");

router.get("/students", studentsCtrl.index);
router.get("/students/new", studentsCtrl.new);
router.post("/students", studentsCtrl.create);
router.get("/students/:id", studentsCtrl.show);
router.put("/students/:id", studentsCtrl.update);
router.delete("/students/:id", studentsCtrl.delete);
router.put("/grade/:id/", studentsCtrl.updateGrade);


module.exports = router;
