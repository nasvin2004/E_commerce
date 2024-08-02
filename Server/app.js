const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {Router} = require("./Routes/productRoutes")
const {userRouter} = require("./Routes/user")
const {cartRouter} = require("./Routes/cart")
const bodyparser = require("body-parser")
const {orderRouter} = require("./Routes/order")

const app = express();
app.use(express.json());
app.use(bodyparser.json())

app.use(cors());

app.set("view engine" ,"ejs")

app.use('/product',Router)
app.use("/auth",userRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)


const DBconnect =async()=>{
    try{
        await mongoose.connect("mongodb+srv://nasvin22:SilverBeach@recipes.zarppgi.mongodb.net/eCommerce?retryWrites=true&w=majority&appName=recipes");
        console.log("Db connected")
    }
    catch(err){
        console.log(err)
    }
}

DBconnect();

const port= 8000;
app.listen(port,()=>{
    console.log(`PORT RUNNING AT ${port}`)
})