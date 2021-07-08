const express = require('express');
const router = express.Router();
const resultsCtrl = require('../controllers/results');

router.get('/', resultsCtrl.index);

module.exports = router;
