const app = require("express")();
const cors = require("cors");
const userRoutes = require("./routes/user.routes.js");
const { json } = require("express");
const { connection } = require("./configs/db.js");
const appoinmentRoutes = require("./routes/appoinment.routes.js");
require("dotenv").config();
app.use(json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to hompage");
});

app.use("/", userRoutes);
app.use("/", appoinmentRoutes);

app.listen(process.env.PORT, async () => {
  try {
    connection;
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
});
