const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load User model
const User = require("../models/User");

// @route   POST api/accounts/chgpass
// @desc    Change user pass
// @access  Public
router.post("/chgpass", (req, res) => {
  const id = req.body.id;
  const cur_password = req.body.cur_password;
  const new_password = req.body.new_password;

  let errors = {};
  // Find user by email
  User.findById({ _id: id }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    // Check Password
    bcrypt.compare(cur_password, user.password).then((isMatch) => {
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(new_password, salt, (err, hash) => {
            if (err) throw err;
            const new_password1 = hash;
            const update = { $set: { password: new_password1 } };
            User.findByIdAndUpdate(id, update, { new: true })
              .then((user) => {
                const payload = {
                  id: user._id,
                  email: user.email,
                  name: user.name,
                  avatar: user.avatar,
                }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                  payload,
                  config.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token,
                    });
                  }
                );
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        errors.password = "Current Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   POST api/accounts/chgemail
// @desc    Change user email
// @access  Public
router.post("/chgemail", (req, res) => {
  const id = req.body.id;
  const cur_email = req.body.cur_email;
  const new_email = req.body.new_email;

  let errors = {};
  // Find existed email
  User.findOne({ email: new_email }).then((user) => {
    if (user) {
      errors.email = "New Email is already existing";
      return res.status(400).json(errors);
    } else {
      // Find user by email
      User.findOne({ email: cur_email }).then((user) => {
        // Check for user
        if (!user) {
          errors.email = "Current Email not found";
          return res.status(400).json(errors);
        } else {
          const update = { $set: { email: new_email } };
          User.findByIdAndUpdate(id, update, { new: true })
            .then((user) => {
              const payload = {
                id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
              }; // Create JWT Payload

              // Sign Token
              jwt.sign(
                payload,
                config.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        }
      });
    }
  });
});

module.exports = router;
