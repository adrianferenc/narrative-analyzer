const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../controllers/categories');

router.get('/categories', categoriesCtrl.index);
router.get('/categories/new', categoriesCtrl.new);
router.post('/categories', categoriesCtrl.create);
router.get('/categories/:id', categoriesCtrl.show);
router.delete('/categories/:id', categoriesCtrl.delete);
router.post('/categories/:id/subcategories', categoriesCtrl.addSub);
router.get('/categories/:categoryId/subcategories/:subcategoryId', categoriesCtrl.updateSub);
module.exports = router;
