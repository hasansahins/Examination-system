const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const test = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "roles",
        },
      },
      {
        $unwind: "$roles",
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          roleName: "$roles.name",
          role: 1,
        },
      },
    ]);

    res.json(test);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  // const id = req.params["id"];
  let id = mongoose.Types.ObjectId(req.params["id"]);
  try {
    const user = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "roles",
        },
      },
      {
        $unwind: "$roles",
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          roleName: "$roles.name",
          role: 1,
        },
      },
      { $match: { _id: id } },
      { $limit: 1 },
    ]);

    res.json(user[0]);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const userCheck = await User.findOne({ email: req.body.email });
    if (userCheck && req.body._id !== userCheck._id.toString()) {
      return res.status(200).json({
        error: `"${req.body.email}" e-posta adresi zaten sistemde kayıtlıdır.`,
      });
    }

    // NEW USER
    if (req.body._id === "0") {
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      const result = await user.save();
      res.json(result);
    }
    // UPDATE USER
    else {
      const user = await User.findById(mongoose.Types.ObjectId(req.body._id));
      console.log(req.body);
      if (user) {
        const result = await User.updateOne(
          {
            _id: mongoose.Types.ObjectId(req.body._id),
          },
          {
            fullName: req.body.fullName,
            email: req.body.email,
            password:
              req.body.password && req.body.password.length > 0
                ? req.body.password
                : user.password,
            role: req.body.role,
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
    const user = await User.findById(req.params.id);
    if (user) {
      const result = await User.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        res.json(true);
      } else {
        res.json({ message: "User not found" });
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/update/settings", async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    if (user) {
      const result = await User.updateOne(
        {
          _id: mongoose.Types.ObjectId(req.body._id),
        },
        {
          settings: req.body.settings,
        }
      );
      res.json(result);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
