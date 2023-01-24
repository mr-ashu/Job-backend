const express = require('express')

const  Upload  = require("../Schema/upload.modal")
 

const job = express.Router()

 

job.post("/" , async (req, res) => {

    const { companyName, position, contract, location  } = req.body

    try {

    
            await Upload.create({ companyName, position, contract, location })

            res.send({
                message: 'Job  apply Successfully',
                status: 'Ok'
            })
    

    } catch (error) {
        console.log(error)
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})
 

job.get("/",  async (req, res) => {
 
    try {
 
       const data =await Upload.find()
       res.send(data)

    } catch (error) {
    
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})


module.exports = job 