const express =require ("express")
const Router = express.Router()
const productController = require("../Controllers/productController.js")
const auth = require("../MIddlewares/auth.js")

Router.get("/get",auth,productController.getAllProducts);
Router.post("/add",productController.createProducts);
Router.patch("/update/:id", productController.updateProduct);
Router.delete("/delete/:id",productController.deleteProduct)


module.exports = {Router};
