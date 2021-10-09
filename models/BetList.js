const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BetListSchema = new Schema({
  val: {
    type: String,
    required: true,
  },
  bkcolor: {
    type: String,
    required: true,
  },
  b_title: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BetList = mongoose.model("betlists", BetListSchema);
