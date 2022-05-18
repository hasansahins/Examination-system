const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const Question = require("../models/Question");
const fs = require("fs");

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "uploads/",
});

router.get("/", async (req, res) => {
  try {
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $project: {
          _id: 1,
          question: 1,
          CategoryName: "$categories.name",
        },
      },
    ]);
    // console.log(questions);
    // const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    // NEW ROLE
    if (req.body._id === "0") {
      const question = new Question({
        question: req.body.question,
        answers: req.body.answers,
        category: req.body.category,
        description: req.body.description,
      });

      const result = await question.save();
      res.json(result);
    }
    // UPDATE USER
    else {
      const question = await Question.findById(req.body._id);
      if (question) {
        const result = await Question.updateOne(
          {
            _id: mongoose.Types.ObjectId(req.body._id),
          },
          {
            question: req.body.question,
            answers: req.body.answers,
            answer: req.body.answer,
            category: req.body.category,
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
    const question = await Question.findById(req.params.id);
    if (question) {
      const result = await Question.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        res.json(true);
      } else {
        res.json({ message: "Question not found" });
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/test/data", async (req, res) => {
  try {
    const questions = [];
    const sorular = req.body.intermediate;

    sorular.forEach((element) => {
      const cevaplar = [];
      for (let index = 0; index < element.propositions.length; index++) {
        const a = element.propositions[index];
        if (a == element.réponse) {
          cevaplar.push({
            answer: a,
            isTrue: true,
          });
        } else {
          cevaplar.push({
            answer: a,
            isTrue: false,
          });
        }
      }
     
      questions.push({
        question: element.question,
        answers: cevaplar,
        category: "6284d5f5a9a88f3b2fb92d6a",
      });
    });

    const result = await Question.insertMany(questions);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
