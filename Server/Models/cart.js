const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: String,
    title:String,
    products:[{
        productId:String,
        quantity:String
    }]


})

const cartModel = mongoose.model("cart",cartSchema)  
module.exports = cartModel