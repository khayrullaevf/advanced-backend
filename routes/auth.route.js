const express=require('express')
const userModel=require('./../models/user.model')
const authController = require('../controllers/auth.controller')


const router=express.Router()



router.post('/register',authController.register)
router.get('/activation/:id',authController.activation)
router.post('/login',authController.login)
router.post('/logout',authController.logout)











module.exports=router
