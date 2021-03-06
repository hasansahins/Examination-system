const express = require("express");
const mongoose = require("mongoose");
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

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    // NEW ROLE
    if (req.body._id === "0") {
      const category = new Category({
        name: req.body.name,
        description: req.body.description,
      });

      const result = await category.save();
      res.json(result);
    }
    // UPDATE USER
    else {
      const category = await Category.findById(req.body._id);
      if (category) {
        const result = await Category.updateOne(
          {
            _id: mongoose.Types.ObjectId(req.body._id),
          },
          {
            name: req.body.name,
            description: req.body.description,
          }
        );
        res.json(result);
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      const result = await Category.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        res.json(true);
      } else {
        res.json({ message: "Category not found" });
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
