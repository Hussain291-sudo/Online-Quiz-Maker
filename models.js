const mongoose=require("mongoose");
const { title } = require("node:process");

const QuizSchema=new mongoose.Schema({title:String,questions:[{question:String,options:[String],correctAnswer:Number}]});

module.exports=mongoose.model("Quiz",QuizSchema);