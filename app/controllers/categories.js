const Student = require("../models/student");
const Narrative = require("../models/narrative");
const Category = require("../models/category");

module.exports = {
  index,
  new: newCategory,
  create,
  show,
  addSub,
  delete: deleteCategory,
  updateSub,
};

async function index(req, res) {
  const categories = await Category.find({});
  res.render("categories/index.ejs", { title: "Categories", categories });
}

function newCategory(req, res) {
  res.render("categories/new.ejs", { title: "Add a Category" });
}

async function create(req, res) {
  try {
    const newCategory = await Category.create(req.body);
    res.redirect(`/categories/${newCategory._id}`);
  } catch (err) {
    res.send(err);
  }
}

async function show(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.render("categories/show.ejs", {
      category,
      title: `${category.name}`,
      value: "",
    });
  } catch (err) {
    res.send(err);
  }
}

async function addSub(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (req.body.newSubcategory!=='' && !category.subcategories.includes(req.body.newSubcategory)) {
      category.subcategories.push(req.body.newSubcategory);
      category.subcategories.sort();
      category.save();
    }
    res.render("categories/show.ejs", {
      category,
      title: `${category.name}`,
      value: "",
    });
  } catch (err) {
    res.send(err);
  }
}

async function deleteCategory(req, res) {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories");
  } catch (err) {
    res.send(err);
  }
}

async function updateSub(req, res) {
  console.log("test");
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
    });
  } catch (err) {
    res.send(err);
  }
}
