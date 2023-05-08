//#region requires
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const User = require("./Models/User");
dotenv.config();
userRoutes = require("./Routes/register");

//#endregion

//#region config
const PORT = process.env.PORT || 3000;
const app = express();
//#endregion

//#region Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//#endregion

//#region Routes

//#region Root
app.get("/", (req, res) => {
  console.log("Agoura backend!");
  const user = new User({
    name: "AhmedMohamed",
    email: "ahmedzain@gmail.com",
    password: "059825",
  });
  user
    .save()
    .then(() => {
      console.log("Done");
    })
    .catch((error) => {
      console.log("Error");
    });
  res.end();
});
//#endregion

//#region users
app.use("/register", userRoutes);
//#endregion

//#endregion

//#region Database Connetion
mongoose.connect(process.env.DATABASE);
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});
//#endregion

app.listen(PORT, () => {
  console.log(`Server is up : http://localhost:${PORT}`);
});
