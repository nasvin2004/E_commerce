const productRouter =require("../Models/productModel.js")
const {v4 : uuid} = require("uuid")


const getAllProducts = async(req,res)=>{
  try{
    const product =  await productRouter.find();
    res.send(product)
    console.log(req.user.TOKENID)
  }
  catch(err){
    res.json(err)
  }
}


const createProducts = async(req,res)=>{
  try{
    
    const data = new productRouter({
      id:uuid(),
      title:req.body.title,
      description:req.body.description,
      prize:req.body.prize
    });
    const savedata= await data.save()
    res.status(201).json({savedata,message:"Success"})
  }
  catch(err){
        res.send(err)
  }

}

const updateProduct = async(req,res)=>{

  const id = req.params.id;

  try{
    await productRouter.findOneAndUpdate({id},{
        
        title : req.body.title,
        description : req.body.description,
        prize : req.body.prize
  })
  res.send("success updated")
    }
   catch(err){
    console.log(err)
   }
  
}
 
const deleteProduct = async(req,res)=>{
  const id = req.params.id;
  try{
    await productRouter.findOneAndDelete({id})
    res.send("SuccessFully deleted")
  }
  catch(err){
        res.send(err)
  }
}


module.exports = {
  getAllProducts,
  createProducts,
  updateProduct,
  deleteProduct
};










