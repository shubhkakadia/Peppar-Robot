const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
  {
    ID: {
      type: Number,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
    },
    Comments: {
      type: String,
    },
    ServiceType: {
      type: String,
    },
    Rating: {
      type: Number,
      required: true,
    },
    Conversation: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("feedback", feedbackSchema);
