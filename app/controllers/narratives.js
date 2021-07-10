const Student = require("../models/student");
const Narrative = require("../models/narrative");
const Category = require("../models/category");

module.exports = {
  index,
  new: newNarrative,
  create,
  revise,
  update,
  delete: deleteNarrative,
};

async function index(req, res) {
  try {
    const narratives = await Narrative.find({});
    const students = await Student.find({});
    res.render("narratives/index.ejs", {
      narratives,
      students,
      title: "Narratives",
      navKey: "narratives",
    });
  } catch (err) {
    res.send(err);
  }
}

async function newNarrative(req, res) {
  try {
    const students = await Student.find({});
    res.render("narratives/new.ejs", {
      students,
      title: "Add a Narrative",
      narrative: "",
      request: "new",
      navKey: "narratives",
    });
  } catch (err) {
    res.send(err);
  }
}

async function create(req, res) {
  try {
    const newNarrative = await Narrative.create(req.body);
    const student = await Student.findById(newNarrative.student);
    student.narratives.push(newNarrative._id);
    await student.save();
    res.redirect(`/narratives`);
  } catch (err) {
    if (newNarrative.student === undefined) {
      res.redirect("/narratives/new");
    } else {
      res.send(err);
    }
  }
}

async function revise(req, res) {
  try {
    const narrative = await Narrative.findById(req.params.id);
    const student = await Student.findById(narrative.student);
    const students = [student];
    res.render("narratives/new.ejs", {
      students,
      narrative,
      title: "Update Narrative",
      request: "update",
      navKey: "narratives",
    });
  } catch (err) {
    res.send(err);
  }
}

async function update(req, res) {
  try {
    const narrative = await Narrative.findById(req.params.id);
    narrative.text = req.body.text;
    narrative.save();
    res.redirect(`/narratives`);
  } catch (err) {
    res.send(err);
  }
}

async function deleteNarrative(req, res) {
  try {
    const narrative = await Narrative.findById(req.params.id);
    const student = await Student.findById(narrative.student);
    for (let i = 0; i < student.narratives.length; i++) {
      if ("" + student.narratives[i] === req.params.id) {
        student.narratives = await student.narratives.splice(1, i);
        await student.save();
      }
    }
    await Narrative.findByIdAndDelete(req.params.id);
    res.redirect("/narratives");
  } catch (err) {
    res.send(err);
  }
}
