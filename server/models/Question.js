const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    answers: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    description: {
      type: String,
    },
    question: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Questions", QuestionSchema);
