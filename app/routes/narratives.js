const express = require('express');
const router = express.Router();
const narrativesCtrl = require('../controllers/narratives');

router.get('/', narrativesCtrl.index);
router.get('/new', narrativesCtrl.new);
router.post('/', narrativesCtrl.create);

module.exports = router;
