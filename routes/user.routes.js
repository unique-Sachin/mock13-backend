const userRoutes = require("express").Router();
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoutes.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await userModel.find({ email });
    if (oldUser.length > 0) {
      res.send({ msg: "user already exist" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) throw err;
        const newUser = new userModel({ email, password: hash });
        await newUser.save();
        res.send({ msg: "user registered" });
      });
    }
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldUser = await userModel.find({ email });
    if (oldUser.length > 0) {
      bcrypt.compare(password, oldUser[0].password, function (err, result) {
        if (err) throw err;
        if (result === true) {
          const token = jwt.sign({ userId: oldUser[0].password }, "mock13");
          res.send({ msg: "logged in", token });
        } else {
          res.send({ msg: "wrong credentials" });
        }
      });
    } else {
      res.send({ msg: "user doesn't exists" });
    }
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

module.exports = userRoutes;
