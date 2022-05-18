const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Role = require("../models/Role");

router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.json(role);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const roleNameCheck = await Role.findOne({ name: req.body.name });
    if (roleNameCheck && req.body._id !== roleNameCheck._id.toString()) {
      return res
        .status(200)
        .json({ error: `"${req.body.name}" isminde kayıtlı rol vardır. Lütfen farklı bir rol adı giriniz.` });
    }

    // NEW ROLE
    if (req.body._id === "0") {
      const role = new Role({
        name: req.body.name,
        pages: req.body.pages,
        active: req.body.active,
      });

      const result = await role.save();
      res.json(result);
    }
    // UPDATE USER
    else {
      const role = await Role.findById(req.body._id);
      if (role) {
        const result = await Role.updateOne(
          {
            _id: mongoose.Types.ObjectId(req.body._id),
          },
          {
            name: req.body.name,
            active: req.body.active,
            pages: req.body.pages,
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
    const role = await Role.findById(req.params.id);
    if (role) {
      const result = await Role.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        res.json(true);
      } else {
        res.json({ message: "Role not found" });
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
