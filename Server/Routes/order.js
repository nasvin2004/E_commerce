const express = require("express")
const orderRouter = express.Router()
const orderController = require("../Controllers/order")
const auth = require('../MIddlewares/auth')


orderRouter.post('/add',auth,orderController.addOrder)
orderRouter.get('/get',auth,orderController.getOrder)


module.exports = {orderRouter}