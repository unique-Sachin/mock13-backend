const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose
  .connect("mongodb+srv://sachin:sachin@cluster0.urwi6.mongodb.net/mock13")
  .then(() => console.log("conncted"))
  .catch((e) => console.log(e));

module.exports = { connection };
