const { userModel } = require("../Models/user.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register=  async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
     
        return res.status(400).json({ status: "fail", message: "Missing fields" });
    }

    try {
        const isNew = await userModel.findOne({ email });
        if (isNew) {
          
            return res.status(400).json({ status: "fail", message: "User already registered" });
        }
        const user =  new userModel({ username, email, password});
        user.save()

        res.json({ user, message: "Successfully registered" });
     
    } catch (err) {
        res.status(500).json({ status: "fail", error: err.message });
    }
};

const login = async(req,res)=>{
 const{email,password} = req.body;
 const user = await userModel.findOne({email})

 if(!user){
    return res.json({message:"Not registered"})
 }
     bcrypt.compare(password,user.password,(err,decoder)=>{
     if(decoder){
        const token = jwt.sign({TOKENID:user._id,tokenemail:user.email},"token-key",{expiresIn:"1h"})
        res.json({Token:token})
     }
     else{
        res.json(err)
     }
         
 })

}
module.exports = { register ,login};
