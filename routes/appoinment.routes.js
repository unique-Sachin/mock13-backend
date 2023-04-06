const appoinmentModel = require("../models/appoinment.model");

const appoinmentRoutes = require("express").Router();

appoinmentRoutes.get("appoinment", async (req, res) => {
  try {
    const { userId } = req.body;
    const data = await appoinmentModel.find({ userId });
    res.send({ data });
  } catch (err) {
    res.send({ msg: "something went wrong", err });
  }
});

appoinmentRoutes.post("appoinment", async (req, res) => {
  try {
    const {
      userId,
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    } = req.body;
    const data = new appoinmentModel({
      userId,
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });
    await data.save();
    res.send({ msg: "appoinment created" });
  } catch (err) {
    res.send({ msg: "something went wrong", err });
  }
});
