require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 | process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const tryCatch = require("../../utils/tryCatch");
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken")
const Employee = require('../../models/Employee');
const Employeer = require('../../models/Employeer');

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());

exports.getEmployeerAboutMe = tryCatch(async(req,res,next)=>{
   
    return res.json({
        status:"success",
        data:req.employeer[0].aboutMe
    })
})

exports.postEmployeerAboutMe = tryCatch(async(req,res,next)=>{
   
  

    const data = await Employeer.findOneAndUpdate({email:req.employee[0].email},{aboutMe:req.body.aboutMe}).then((data)=>{
        console.log("employeer aboutme updated successfully")
    })
    return res.json({
        status:"succesfully profile updated",
        data:data[0].aboutMe
    })

})