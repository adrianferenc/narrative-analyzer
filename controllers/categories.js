const Student = require("../models/student");
const Narrative = require("../models/narrative");
const Category = require("../models/category");

module.exports = {
  index,
  create,
  show,
  addSub,
  delete: deleteCategory,
  updateSub,
};

async function index(req, res) {
  const categories = await Category.find({});
  res.render("categories/index.ejs", {
    title: "Categories",
    categories,
    navKey: "categories",
  });
}

async function create(req, res) {
  try {
    const newCategory = await Category.create(req.body);
    res.redirect(`/categories/${newCategory._id}`);
  } catch (err) {
    if (req.body.name === "") {
      res.redirect("/categories");
    } else {
      res.send(err);
    }
  }
}

async function show(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.render("categories/show.ejs", {
      category,
      title: `${category.name}`,
      value: "",
      navKey: "categories",
    });
  } catch (err) {
    res.send(err);
  }
}

async function addSub(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (
      req.body.newSubcategory !== "" &&
      !category.subcategories.includes(req.body.newSubcategory)
    ) {
      category.subcategories.push(req.body.newSubcategory);
      category.subcategories.sort();
      category.save();
    }
    res.render("categories/show.ejs", {
      category,
      title: `${category.name}`,
      value: "",
      navKey: "categories",
    });
  } catch (err) {
    res.send(err);
  }
}

async function deleteCategory(req, res) {
  try {
    const students = await Student.find({});
    const category = await Category.findById(req.params.id);
    for (let student of students) {
      if (category.name in student.categories) {
        const studentCategories = { ...student.categories };
        delete studentCategories[category.name];
        student.categories = await studentCategories;
        await student.save();
      }
    }
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories");
  } catch (err) {
    res.send(err);
  }
}

async function updateSub(req, res) {
  try {
    const category = await Category.findById(req.params.categoryId);
    category.subcategories.splice(
      category.subcategories.findIndex(
        (subcat) => subcat === req.params.subcategoryId
      ),
      1
    );
    category.save();
    res.render("categories/show.ejs", {
      category,
      title: `${category.name}`,
      value: `${req.params.subcategoryId}`,
      navKey: "categories",
    });
  } catch (err) {
    res.send(err);
  }
}
