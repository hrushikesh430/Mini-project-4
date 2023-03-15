const mongoose = require("mongoose")

const employeer = new mongoose.Schema({
    name:{
        type:String,
        required :[true,"Please provide your name"]  
    },
    email:{
        type:String,
        required :[true,"Please provide your email"]  
    },
    password:{
        type:String,
        required :[true,"Please provide your password"]  
    },
    phone:{
        type:Number,
        required:[true,"Please provide your email"]
    }
   

});
const Employeer = mongoose.model("employeer",employeer); 
module.exports = Employeer