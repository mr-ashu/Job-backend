const express = require('express')

const  User  = require('../Schema/user.modal')
const  JobPost  = require("../Schema/jobPost.modal")
const  authMiddlewares  = require('../middleware/authmiddleware')

const job = express.Router()

 

job.post("/", authMiddlewares, async (req, res) => {

    const { companyName, position, contract, location  } = req.body

    try {

        const isAdminExist = await User.findById({ _id: id })

        if (isAdminExist.role !== 'admin') {
            res.status(403).send({
                message: "You're not authorized for this action",
                status: false
            })
        } else {
            await JobPost.create({ companyName, position, contract, location })

            res.send({
                message: 'Job Post Create Successfully',
                status: 'Ok'
            })
        }

    } catch (error) {
        console.log(error)
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})

job.patch("/:id",authMiddlewares, async (req, res) => {

    const {id} = req.params
    let { companyName, position, contract, location  } = req.body

    if (companyName === "") companyName = undefined
    if (position === "") position = undefined
    if (contract === "") contract = undefined
    if (location === "") location = undefined

    try {

        const isAdminExist = await User.findById({ _id: id })

        if (isAdminExist.role !== 'admin') {
            res.status(403).send({
                message: "You're not authorized for this action",
                status: false
            })
        } else {
            await JobPost.findByIdAndUpdate({ _id: id }, { companyName, position, contract, location })

            res.send({
                message: 'Job Post Edit Successfully',
                status: false
            })
        }

    } catch (error) {
        console.log(error)
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})

job.delete("/:id", async (req, res) => {

    const {id} = req.params
 


    try {

        const isAdminExist = await User.findById({ _id: id })

        if (isAdminExist.role !== 'admin') {
            res.status(403).send({
                message: "You're not authorized for this action",
                status: false
            })
        } else {
            await JobPost.findByIdAndDelete({ _id: id })

            res.send({
                message: 'Job Post Delete Successfully',
                status: false
            })
        }

    } catch (error) {

        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})

job.get("/",  async (req, res) => {
 
    try {
 
       const data =await JobPost.find()
       res.send(data)

    } catch (error) {
    
        res.send({
            message: 'Something went wrong please try again',
            status: false
        })

    }
})


module.exports = job 