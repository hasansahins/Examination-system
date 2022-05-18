const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    // answers: {
    //   type: Map,
    //   of: [
    //     new mongoose.Schema({
    //       choiceName: {
    //         type: String,
    //         required: true,
    //       },
    //       answer: {
    //         type: String,
    //         required: true,
    //       },
    //     }),
    //   ],
    // },
    // answers: {
    //   type: [
    //     {
    //       choiceName: {
    //         type: String,
    //         required: true,
    //       },
    //       answer: {
    //         type: String,
    //         required: true,
    //       },
    //     },
    //   ],
    // },
    answers: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    question: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Questions", QuestionSchema);
