const mongoose = require("mongoose")

const employee = new mongoose.Schema({
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
const Employee = mongoose.model("employees",employee); 
module.exports = Employee