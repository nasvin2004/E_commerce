const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
   orderId:String,
   userId:String, 
   fullname :String,
   phno :Number,
   address:String,
   orderDate:Date,
   expDate:Date,
   orderProducts:[],
   total:Number,
   orderStatus:{
    type:String,
   default:"InProgress"
   },
   email:String
})

const orederModel = mongoose.model("order",orderSchema)
module.exports =orederModel