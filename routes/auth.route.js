const express=require('express')
const userModel=require('./../models/user.model')
const authController = require('../controllers/auth.controller')


const router=express.Router()



router.post('/register',authController.register)
router.post('/activation/:id',authController.activation)










module.exports=router
