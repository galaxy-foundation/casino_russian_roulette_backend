const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./api/users");
const accounts = require("./api/accounts");
const mainbet = require("./api/mainbet");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
const mongourl = require("./config/config").mongoURI;
mongoose
  .connect(mongourl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Use Routes
app.use("/api/users", users);
app.use("/api/accounts", accounts);
app.use("/api/mainbet", mainbet);

const port = require("./config/config").port;
app.listen(port, () => console.log(`Server running on port ${port}`));
