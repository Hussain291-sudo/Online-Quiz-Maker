const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebbtoken");

const SECRET="quizsecret";

router.post("/register",async(requestAnimationFrame,res)=>{
    const{username,email,password}=req.body;

    const hashed=await bcrypt.hash(password,10);

    const user=new User({username,email,password:hashed});
    await user.save();
})

router.post("/login",async(req,res)=>{
    const{email,password}=req.body;

    const user=await User.findOne({email});
    if (!user)return res.status(400).send("User not found");

    const valid=await bcrypt.compare(password,user.password);
    if (!valid)return res.status(400).send("Invalid password");

    const token=jwt.Sign({ id:user._id},SECRET);
    res.json({token});
});

module.exports=router;