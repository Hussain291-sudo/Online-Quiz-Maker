const router=require("express").Router();
const Quiz=require("../models/Quiz");


router.post("/create",async(req,res)=>{
    const quiz=new Quiz(req.body);
    await quiz.save();
    res.json(quiz);
});

router.get("/",async(req,res)=>{
    const quizzes=await Quiz.find();
    res.json(quizzes);
});

router.get("/",async(req,res)=>{
    const quiz=await Quiz.findById(req.params.id);
    res.json(quiz);
});

module.exports=router;