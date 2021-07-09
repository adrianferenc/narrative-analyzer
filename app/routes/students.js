const express = require('express');
const router = express.Router();
const studentsCtrl = require('../controllers/students');

router.get('/', studentsCtrl.index);
router.get('/new', studentsCtrl.new);
router.post('/', studentsCtrl.create);
router.get('/:id', studentsCtrl.show);
router.delete("/:id",studentsCtrl.delete);

module.exports = router;
