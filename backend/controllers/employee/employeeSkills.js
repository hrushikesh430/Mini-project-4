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

exports.getEmployeeSkills = tryCatch(async(req,res,next)=>{
  

    return res.json({
        status:"success",
        data:req.employee[0].skills
    })
})

exports.postEmployeeSkills = tryCatch(async(req,res,next)=>{
   

    const data = await Employee.findOneAndUpdate({email:req.employee[0].email},{$push :{skills:req.body.skills}},{new:true}).then((data)=>{
        console.log("employee skills updated successfully");
    }).catch(err=>{
        console.log("failed to update skills of employee");
    });
    
    return res.json({
        status:"succesfully profile updated",
        data:data[0].skills
    })
})