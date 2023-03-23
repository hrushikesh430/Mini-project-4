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

exports.getEmployeeProfile = tryCatch(async(req,res,next)=>{

   
    return res.json({
        status:"success",
        data:req.employee[0]
    })
})

exports.postEmployeeProfile = tryCatch(async(req,res,next)=>{

    
   
    const data = await Employee.findOneAndUpdate({email:req.employee[0].email},{address:req.body.address,phone:req.body.phone,insta:req.body.insta,facebook:req.body.facebook}).then((data)=>{
        console.log("Updated successfully "+data);
      
    }).catch(err=>{
        console.log("failed to update "+err);
    })
    return res.json({
        status:"succesfully profile updated",
        address:data[0].address,
        phone:data[0].phone
    })
})
