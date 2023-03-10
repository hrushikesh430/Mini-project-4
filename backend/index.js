require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 | process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")


// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

app.get('/',(req,res)=>{
    res.send("Hello World");
})




// db 
mongoose.connect(process.env.URI, () => {
    console.log("Db connected");
  });

app.listen(PORT , (req,res)=>{
    console.log(`the app is listning in port ${PORT}`);
})