const express = require("express");

const router = express.Router();

const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/create", async (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const createCategory = await category.save();
    res.json(createCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
