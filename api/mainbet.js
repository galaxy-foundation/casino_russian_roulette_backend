const express = require("express");
const router = express.Router();

// Load BetList model
const BetList = require("../models/BetList");

// @route   POST api/mainbet/rollsave
// @desc    Save roll list
// @access  Public
router.post("/rollsave", (req, res) => {
  const newBetList = new BetList({
    val: req.body.val,
    bkcolor: req.body.bkcolor,
    b_title: req.body.b_title,
  });
  newBetList
    .save()
    .then((user) => res.json("Register success"))
    .catch((err) => console.log(err));
});

module.exports = router;
