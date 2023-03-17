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
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GOOGLE_CLIENT_ID = '1023260677636-rilkrn4ohrqidp221jt1vce73crp2fup.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//       userProfile=profile;
//       return done(null, userProfile);
//   }
// ));

exports.getAuth = tryCatch(async(req,res)=>{
    // passport.authenticate('google', { scope : ['profile', 'email'] });
    console.log(req.user)
    res.json({
        status:"success"
    })
})

exports.getCallback = tryCatch(async(req,res)=>{
    
    console.log(req.user.emails[0].value)
    const employee = await Employee.find({email:req.user.emails[0].value});
    // const employeer = await Employeer.find({email:req.user.emails[0].value});

    console.log("here")
    if(employee)
    {
        
        // console.log("here 1")
        
        const accessToken = jwt.sign({employee},process.env.ACCESS_TOKEN);
        return res.cookie("access_token",accessToken).json({
            status:"Successful as employee",
            token:accessToken,
            data:employee
        })
    }
    const employeer = await Employeer.find({email:req.user.emails[0].value});
    if(employeer)
    {
    // console.log("here 2")

        const accessToken = jwt.sign({employeer},process.env.ACCESS_TOKEN);
        return res.cookie("access_token",accessToken).json({
            status:"Successful as employee",
            token:accessToken,
            data:employeer
        })
    }

    res.json({
        status:"failure, user not found"
    })  
  
})