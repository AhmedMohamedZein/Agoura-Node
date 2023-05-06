//#region requires
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
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
//#region 

//#region Root 

app.get('/' , (req, res)=> {
    console.log('Agoura backend!');
    res.end();
});

app.listen(PORT, ()=>{
    console.log(`Server is up : http://localhost:${PORT}`);
});