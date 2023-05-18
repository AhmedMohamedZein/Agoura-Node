//#region requires
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const NotificationScheduler = require("./Utils/NotificationScheduler");
const userRoutes = require("./Routes/register");
const loginRoutes = require("./Routes/login");
const HomeRoute = require(path.join(__dirname, "./Routes/Home"));
const placeRoutes = require(path.join(__dirname, "./Routes/place"));
const bidRoutes = require(path.join(__dirname, "./Routes/bid"));
const ProfileRoutes = require(path.join(__dirname , './Routes/Profile'))
const cookieParser = require('cookie-parser');
const dashboardRoutes=require(path.join(__dirname , './Routes/dashboard'))


//#endregion

//#region config
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
//#endregion

//#region Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
//#endregion

//#region Root
app.get("/", (req, res) => {
  console.log("Agoura backend!");
  res.end();
});
//#endregion

//#region
app.use("/register", userRoutes);
app.use("/auth", loginRoutes);
app.use("/home", HomeRoute);
app.use("/place", placeRoutes);
app.use("/bid", bidRoutes);
app.use("/users", ProfileRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/verify", verifyEmailRoute);


//#endregion

//#region Database Connetion
mongoose.connect(process.env.DATABASE);
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});
//#endregion

//#region TaskScheduling

const notificationScheduler = new NotificationScheduler("0 0 * * *");
notificationScheduler.start();

//#endregion

app.listen(PORT, () => {
  console.log(`Server is up : http://localhost:${PORT}`);
});
