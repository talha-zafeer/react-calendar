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
});

const DayEvent = mongoose.model("day_event", userSchema);

module.exports = DayEvent;
