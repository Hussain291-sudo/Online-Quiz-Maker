const express=require("express");
const monogoose=require("mongoose");
const cors=require("cors");

const authRoutes=require("./routes/auth");
const quizRoutes=require("./routes/quiz");

const app=express();

app.use(cors());
app.use(express.json());

monogoose.connect("mongodb://127.0.0.1:27017//quizApp").then(()=>console.log("MongoDB connected")).catch(err=>console.log(err));

app.use("/api/auth",authRoutes);
app.use("/api/quiz",quizRoutes);

app.listen(5000,()=>console.log("Server running on port 5000"));