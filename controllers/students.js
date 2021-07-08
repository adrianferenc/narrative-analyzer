const Student = require('../models/student');
const Narrative = require('../models/narrative');
const Category = require('../models/category');

module.exports = {
	index,
    new: newStudent,
    create
};

function index(req, res) {
	res.render('students/index.ejs', { title: 'Students'});
}


function newStudent(req, res) {
	res.render('students/new.ejs', { title: 'Add a Student'});
}


function create(req, res) {
    console.log(req.body);
  res.redirect("/students");
}
