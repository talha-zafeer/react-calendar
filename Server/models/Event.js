const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter email"],
  },
  location: {
    type: String,
    required: [true, "Please enter email"],
  },
  createdBy: {
    type: String,
    required: true,
  },
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
});

const Event = mongoose.model("event", userSchema);

module.exports = Event;
