const monogoose=require("monogoose");
const UserSchema=new monogoose.Schema({username:String,email:String,password:String});

module.exports=monogoose.model("User",UserSechema);