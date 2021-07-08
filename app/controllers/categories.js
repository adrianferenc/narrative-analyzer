const Student = require('../models/student');
const Narrative = require('../models/narrative');
const Category = require('../models/category');

module.exports = {
	index,
};

function index(req, res) {
	res.render('categories/index.ejs', { title: 'Categories'});
}

