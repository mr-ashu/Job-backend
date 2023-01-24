const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UModals =require("../Schema/user.modal")  
 

const user = express.Router()

user.get("/",async (req,res)=>{
    const user=await UModals.find()
    res.send(user)
})
user.post("/signup", async (req, res) => {

    const { name, email, password } = req.body
  let role;

    if (email.includes("@masaischool.com")) {
        role = 'admin'
    } else {
         role = 'user'
    }
 
    try {
        const existingUser = await UModals.findOne({ email })

        if (existingUser) {
            res.status(403).send({
                message: `${email} is already been registered with this email ID`,
                status: 'false'
            })
        } else {
            bcrypt.hash(password, 5, async function (err, hash) {
                if (err) {
                    res.status(404).send({
                        message: 'Something went wrong , Please try again',
                        status: 'false'
                    })
                } else {
                    try {

                      let u=  await UModals.create({name,email,password:hash,role})

                        res.status(200).send({
                            message: ` account create successfully`,
                            status: 'Ok',
                            user:u
                        })

                    } catch (error) {

                        res.status(404).send({
                            message: 'Something went wrong , Please try again',
                            status: 'false'
                        })

                    }
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({
            message: 'Something went wrong , Please try again',
            status: 'false'
        })

    }

})
 
user.post("/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    if (!email || !password) {
      return res.send({message: "Missing Details"});
    }

    const isExist = await UModals.findOne({email});
    if (!isExist) {
      return res.send({message: "Email does not exist"});
    }
    const checkDomain = email.split("@");
    const domain = checkDomain[checkDomain.length - 1];
    console.log(domain, email)
        if(domain === "masaischool.com"){
            if (domain) {
                const token = jwt.sign({email, name: isExist.name, role: "Admin"}, "SECRET", {
                  expiresIn: "7 days",
                });
                return res.send({token});
              }
              return res.send({message: "Failed"});
        }
        else{
            bcrypt.compare(password, isExist.password, function (err, result) {
                if (result) {
                  const token = jwt.sign({email, name: isExist.name, role: isExist.role}, "SECRET", {
                    expiresIn: "7 days",
                  });
                  return res.send({token});
                }
                return res.send({message: "Failed"});
            });
        }

    
  } catch (e) {
    res.status(404).send({message: e.message});
  }
});

 
module.exports = user