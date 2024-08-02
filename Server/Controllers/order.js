const orderModel = require("../Models/order");
const cartModel = require("../Models/cart");
const productModel = require("../Models/productModel");
const {v4 : uuid} = require("uuid")

const addOrder = async (req, res) => {
    try {
        const userId = req.user.TOKENID;
        const email = req.user.tokenemail;
        const fullname = req.body.fullname;
        const phno = req.body.phno;
        const address = req.body.address;
        const orderDate = new Date();
        const userCart = await cartModel.findOne({ userId });
        let total = 0;
        let productArray = [];
        const products = userCart.products

        for (let i = 0; i < products.length; i++) {
            const productId = products[i].productId;
            const quantity = products[i].quantity;

            // Fetch product data
            const product = await productModel.findOne({ id: productId });
          
          //  console.log(product)
            if (product) {
                const cartProduct = {};
                cartProduct.title = product.title;
                cartProduct.description = product.description;
                cartProduct.image = product.image;
                cartProduct.prize = product.prize;
                cartProduct.quantity = quantity;
                total += Number(product.prize) * Number(quantity);
                productArray.push(cartProduct);
            } else {
                console.warn(`Product not found: ${productId}`);
            }
        }

        const orderProducts = productArray;

        function addDays(date, days) {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        const expDate = addDays(orderDate, 10);
        const orderData = new orderModel({
            orderId:uuid(),
            userId,
            fullname,
            phno,
            address,
            orderDate,
            expDate,
            orderProducts,
            total,
            email
        });

        await orderData.save();
        res.status(201).json({ message: "Order created successfully", orderData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getOrder = async (req, res) => {
    try {
        const userId = req.user.TOKENID;
        const order = await orderModel.findOne({ userId });

       
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const { orderId, orderProducts, orderDate, expDate, orderStatus, total } = order;

        res.status(200).json({ orderId, orderProducts, orderDate, expDate, orderStatus, total });

      
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addOrder, getOrder };


