require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000 | process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const tryCatch = require("../utils/tryCatch");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken")
const Employee = require('../models/Employee');
const Employeer = require('../models/Employeer');

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

exports.postLogin = tryCatch(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password)
    {
        throw AppError(300,"Invalid Username or Password",404);
    }
   
   
    let employee = await Employee.find({email,password});
    let employeer = await Employeer.find({email,password});
   
    if(!employee && !employeer)
    {
       throw AppError(300,"User Not Found",404);
    }

    if(employee)
    {

        const accessToken = jwt.sign({employee},process.env.ACCESS_TOKEN);
        return res.cookie("access_token",accessToken).json({
            status:"Successful as employee",
            token:accessToken,
            data:employee
        })
    }
    if(employeer)
    {
        const accessToken = jwt.sign({employeer},process.env.ACCESS_TOKEN);
        return res.cookie("access_token",accessToken).json({
            status:"Successful as employee",
            token:accessToken,
            data:employeer
        })
    }
})

exports.getLogin = tryCatch(async(req,res,next)=>{
    
    
    return res.json({
        status:"success"
    })
})

