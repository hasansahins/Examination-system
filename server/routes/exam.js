const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const User = require("../models/User");

router.get("/soruGetir", async (req, res) => {
  try {
    const questions = await Question.find();
    const sorular = [];
    const randomNumbers = [];
    let i = 0;
    questions.forEach((question) => {
      if (i < 30) {
        const random = Math.floor(Math.random() * questions.length);
        if (randomNumbers[random] === undefined) {
          sorular.push(questions[random]);
          randomNumbers.push(random);
        }
      }
      i++;
    });
    res.json(sorular);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/sinavBitir", async (req, res) => {
  try {
    const result = Answer.insertMany(req.body.answers);
    res.json({ message: "Sınavınız başarıyla tamamlandı." });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/sinavSonucu/:id", async (req, res) => {
  try {
    console.log(req.params["id"]);
    const answers = await Answer.find({ user: req.params["id"] });

    res.json(answers);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
