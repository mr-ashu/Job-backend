const express =require("express");
const Product = require("../Schema/data.modal");
 
const User = require("../Schema/user.modal");
const Cart =require("../Schema/cart.modal")
 
 
 
 
const app=express.Router()

const authmiddleware=async (req,res,next)=>{
    let token=req.headers.token;
    if(!token){
        return res.send("token not found")
    }
    const [email,password]=token.split("_#_");
    try {
        let user= await User.findOne({email});
        if(user){
            if(password===user.password){
                req.userId=user.id;
                next()
            }
            else{
                res.status(404).send(`Auth Failed,incorrect password`)
            }
        }
        else{
            res.send(404).send(`user with email:${email} not found`)
        }
    } catch (e) {
        res.status(404).send(e.message)
        
    }
}

app.use(authmiddleware)
app.get("/",async(req,res)=>{
 
    try {
       
        let carts=await Cart.find({user:req.userId}).populate([
            "user",
            "data",
            
        ]);
        res.send(carts)
    } 
    catch (e) {
        res.status(400).send(e.message)
    }
})

app.post("/",async(req,res)=>{
     
    try {

     let product=await Product.findById(req.body.product);
 
        let cart=await Cart.create({
            ...req.body,
            user:req.userId,
        });
        res.send(cart)

  
        
    } 
    catch (e) {
        res.status(400).send(e.message)
    }
})



app.delete("/:id", async (req, res) => {
    let {id}=req.params;
    try {
        let u = await Cart.findByIdAndDelete({_id:id})
        res.send(u)
    } catch (e) {
        res.status(404).send(e.message)
    }
});
 
app.patch("/:id", async (req, res) => {
    let {id}=req.params;
    
    let product=Product.findById({_id:id})
 
     if(!product){
        return res.status(404).send("not found")
     }
    try {

        let u = await  Cart.replaceOne({_id:id}, req.body)
    
         res.send(u)
       
    } catch (e) {
        res.status(500).send(e.message)
    }
});


app.get("/:id",async(req,res)=>{
    let {id}=req.params;
    let user=await Cart.findOne({_id:id})
     res.send(user)
     
     
   })
 
module.exports=app