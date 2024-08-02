const monogoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new monogoose.Schema({
    username : String,
    email : String,
    password : String
})



userSchema.pre("save" , async  function(next){
    if(!this.isModified("password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})


const userModel = monogoose.model("user",userSchema);
module.exports = {userModel}