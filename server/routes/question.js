const express = require("express");

const router = express.Router();

const Question = require("../models/question");

router.get("/", async (req, res) => {
  try {
    const quesitonss = await Question.find();

    const quesitons = await Question.find();
    res.json(quesitons);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/create", async (req, res) => {
  const quesiton = new Question({
    question: req.body.question,
    answer: req.body.answer,
    image: req.body.image,
    category: req.body.category,
    answers: req.body.answers,
  });

  try {
    const createQuestion = await quesiton.save();
    res.json(createQuestion);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
