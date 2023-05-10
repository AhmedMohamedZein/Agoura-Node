//#region requires
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const NotificationScheduler = require('./Utils/NotificationScheduler')

dotenv.config();
const userRoutes = require("./Routes/register");
const loginRoutes = require('./Routes/auth');
const HomeRoute = require(path.join(__dirname , './Routes/Home'));
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


//#region Root
app.get("/", (req, res) => {
  console.log("Agoura backend!");
  res.end();
});
//#endregion

//#region 
app.use("/register", userRoutes);
app.use('/login' , loginRoutes);
app.use('/home' , HomeRoute);
//#endregion


//#region Database Connetion
mongoose.connect(process.env.DATABASE);
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});
//#endregion

//#region TaskScheduling

const notificationScheduler = new NotificationScheduler('0 0 * * *');
notificationScheduler.start();

//#endregion

app.listen(PORT, () => {
  console.log(`Server is up : http://localhost:${PORT}`);
});
