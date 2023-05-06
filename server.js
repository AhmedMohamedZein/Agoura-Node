//#region requires
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();
//#endregion

//#region config
const PORT = process.env.PORT || 3000; 
const app = express();
//#endregion

//#region Middlewares
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended : true} ) );
app.use( cors() );
//#endregion 

//#region Routes
    
//#endregion

//#region Root 
app.get('/' , (req, res)=> {
    console.log('Agoura backend!');
    res.end();
});
//#endregion


mongoose.connect(process.env.DATABASE);
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

app.listen(PORT, ()=>{
    console.log(`Server is up : http://localhost:${PORT}`);
});