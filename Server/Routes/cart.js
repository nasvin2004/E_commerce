const express = require("express")
const cartRouter = express.Router();
const cartController = require("../Controllers/cart")
const auth =require('../MIddlewares/auth')

cartRouter.post("/addCart",auth,cartController.addCart)
cartRouter.get("/getCart",auth,cartController.getCart)
cartRouter.delete("/deleteCart",auth,cartController.deleteProduct)




module.exports = {cartRouter}
