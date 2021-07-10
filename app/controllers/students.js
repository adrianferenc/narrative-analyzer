const Student = require("../models/student");
const Narrative = require("../models/narrative");
const Category = require("../models/category");

module.exports = {
  index,
  new: newStudent,
  create,
  show,
  delete: deleteStudent,
  update,
};

async function index(req, res) {
  try {
    const students = await Student.find({});
    const studentNarratives = {};
    for (let student of students) {
      studentNarratives[student.name] = [];
      for (let narrative of student.narratives) {
        studentNarratives[student.name].push(
          await Narrative.findById(narrative)
        );
      }
    }
    res.render("students/index.ejs", {
      students,
      studentNarratives,
      title: "Students",
    });
  } catch (err) {
    res.send(err);
  }
}

function newStudent(req, res) {
  res.render("students/new.ejs", { title: "Add a Student" });
}

async function create(req, res) {
  try {
    const newStudent = await Student.create(req.body);
    res.redirect(`/students/${newStudent._id}`);
  } catch (err) {
    res.send(err);
  }
}

async function show(req, res) {
  try {
    const student = await Student.findById(req.params.id);
    console.log(student);
    const narrativeIds = await Narrative.find({ student: student._id });
    const narratives = [];
    for (let id of narrativeIds) {
      const narrative = await Narrative.findById(id);
      narratives.push(narrative);
    }
    const categories = await Category.find({});
    res.render("students/show.ejs", {
      student,
      narratives,
      categories,
      title: `${student.name}`,
    });
  } catch (err) {
    res.send(err);
  }
}

async function deleteStudent(req, res) {
  try {
    const student = await Student.findById(req.params.id);
    for (let i = 0; i < student.narratives.length; i++) {
      await Narrative.findByIdAndDelete(student.narratives[i]);
    }
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/students");
  } catch (err) {
    res.send(err);
  }
}

async function update(req, res) {
  try {
    const student = await Student.findById(req.params.id);
    const updatedCategories = [...req.body.category];
    const tempObject = {};
    for (let i = 0; i < updatedCategories.length; i++) {
        tempObject[updatedCategories[i]] = [...req.body.subcategory][i];
    }
    for (let i = 0; i < updatedCategories.length; i++) {
      if (tempObject[updatedCategories[i]] ==='None'){
        delete tempObject[updatedCategories[i]];
      }
    }
    student.categories = await tempObject;
    await student.save();
    res.redirect(`/students/${req.params.id}`);
  } catch (err) {
    res.send(err);
  }
}
