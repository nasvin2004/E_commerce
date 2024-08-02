const cartModel = require("../Models/cart")
const productModel =require("../Models/productModel")
const jwt = require("jsonwebtoken");



const addCart = async (req, res) => {
    try {
      const userId = req.user.TOKENID;
      const productId = req.body.productId;
      const quantity = req.body.quantity; 
  
   
      let userCart = await cartModel.findOne({ userId });
  
      if (userCart) {
    
        const productIndex = userCart.products.findIndex(product => product.productId === productId);
  
        if (productIndex !== -1) {
       
          userCart.products[productIndex].quantity = quantity;
          await userCart.save();
          res.status(200).json({ message: 'Product quantity updated in the cart.' });
        } else {
        
          userCart.products.push({ productId, quantity });
          await userCart.save();
          res.status(200).json({ message: 'Product added to the cart.' });
        }
      } else {
       
        userCart = new cartModel({
          userId,
          products: [{ productId, quantity }]
        });
        await userCart.save();
        res.status(201).json({ message: 'Cart created and product added.' });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  
  const getCart = async (req, res) => {
    const userId = req.user.TOKENID;
    try {
      // Find the cart for the given user ID
      const userCart = await cartModel.findOne({ userId });
  
      if (!userCart) {
        return res.status(404).json({ message: "No items in cart" });
      }
  
      const products = userCart.products;

      let cartProductArray = [];
      for (let i = 0; i < products.length; i++) {
        const productId = products[i].productId; // Ensure correct field access
        const quantity = products[i].quantity;
  
        // Fetch product data
        const product = await productModel.findOne({ id: productId });
  
        if (product) {
          const cartproduct={}
          cartproduct.title =product.title;
          cartproduct.description = product.description ;
          cartproduct,image= product.image
          cartproduct.prize=product.prize
          cartproduct.quantity=quantity
          cartProductArray.push(cartproduct);
        } else {
          console.warn(`Product not found: ${productId}`);
        }
      }

  
      res.json(cartProductArray);
      console.log(cartProductArray);
  
    } catch (err) {
      console.error("Error fetching cart:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };



  const deleteProduct = async (req, res) => {
    const userId = req.user.TOKENID;
    const productId = req.body.productId;
  
    try {
     
      const userCart = await cartModel.findOne({ userId });
  
      if (!userCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const products = userCart.products;
  
      if (products.length === 1) {
        
        await cartModel.findOneAndDelete({ userId });
        return res.status(200).json({ message: "Cart deleted" });
      }
  
      // Filter out the product to be deleted
      const newProducts = products.filter(product => product.productId !== productId);
  
    
      userCart.products = newProducts;
      await userCart.save();
  
      console.log(newProducts);
      res.json(newProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  



  module.exports = {addCart,getCart,deleteProduct};

  