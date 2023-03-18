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

exports.getEmployeeAboutMe = tryCatch(async(req,res,next)=>{
  
    return res.json({
        status:"success",
        data:req.employee[0]
    })
})

exports.postEmployeeAboutMe = tryCatch(async(req,res,next)=>{
   
   


    const data = await Employee.findOneAndUpdate({email:req.employee[0].email},{aboutMe:req.body.aboutMe}).then((data)=>{
        console.log("aboutMe updated successfully of employee")
    }).catch(err=>{
        console.log("failed to update aboutMe of employee");
    })
    return res.json({
        status:"succesfully profile updated",
        data:data
    })

})